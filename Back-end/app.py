from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
app.secret_key = "flask_messanger_nakheir"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{os.path.join(basedir, 'database.db')}"
)
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# error keys
ERROR_KEY = {
    "null": -1,
    "404": 0,
    "success": 1,
    "get": 2,
    "similar_data": 3,
    "unknown": 4
}

# database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=True,unique=True)
    public_name = db.Column(db.String, unique=False, nullable=False)
    chats = db.Column(db.JSON, default=list)

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chatname = db.Column(db.String, unique=True, nullable=False)
    chats = db.Column(
        db.JSON,
        nullable=False,
        default=lambda: {"chats": []}
    )

# init of database
with app.app_context():
    db.create_all()

# socketio parts
@socketio.on("connect")
def socket_connect():
    print("Socket connected")

@socketio.on("disconnect")
def socket_disconnect():
    print("Socket disconnected")

@socketio.on("join-user")
def join_user(data):
    if not data:
        return

    public_name = data.get("public_name")

    if not public_name:
        return

    join_room(public_name)

    print(f"User '{public_name}' joined socket room")

    emit("socket-ready", {
        "success": True,
        "public_name": public_name
    })

# routes
@app.route("/create-chat", methods=["POST"])
def create_chat():
    json_data = request.get_json(silent=True)

    if not json_data:
        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    userPublicName = json_data.get("userPublicName")
    targetPublicName = json_data.get("targetPublicName")

    if userPublicName is None or targetPublicName is None:
        return {
            "success": False,
            "error": "لطفا تمامی مقادیر را بفرستید.",
            "code": ERROR_KEY["null"]
        }

    userData = User.query.filter_by(
        public_name=userPublicName
    ).first()

    targetUserData = User.query.filter_by(
        public_name=targetPublicName
    ).first()

    if userData is None or targetUserData is None:
        return {
            "success": False,
            "error": "کاربر مورد نظر یافت نشد.",
            "code": ERROR_KEY["404"]
        }

    if userData.id == targetUserData.id:
        return {
            "success": False,
            "error": "نمی‌توانید با خودتان چت ایجاد کنید.",
            "code": ERROR_KEY["similar_data"]
        }

    chat_name_parts = sorted([
        userPublicName,
        targetPublicName
    ])

    chat_name = f"{chat_name_parts[0]}_{chat_name_parts[1]}"

    existing_chat = Chat.query.filter_by(
        chatname=chat_name
    ).first()

    if existing_chat:
        return {
            "success": False,
            "error": "چت قبلا ایجاد شده است.",
            "code": ERROR_KEY["similar_data"],
            "chat_id": existing_chat.id,
            "chat_name": existing_chat.chatname
        }

    new_chat = Chat(
        chatname=chat_name,
        chats={
            "chats": [
                {
                    "target": targetPublicName,
                    "messages": []
                }
            ]
        }
    )

    db.session.add(new_chat)

    if userData.chats is None:
        userData.chats = []

    if chat_name not in userData.chats:
        userData.chats.append(chat_name)

    if targetUserData.chats is None:
        targetUserData.chats = []

    if chat_name not in targetUserData.chats:
        targetUserData.chats.append(chat_name)

    db.session.commit()

    socket_data = {
        "success": True,
        "action": "chat-created",
        "chat": {
            "id": new_chat.id,
            "chat_name": new_chat.chatname,
            "chat_data": new_chat.chats
        },
        "users": [
            userPublicName,
            targetPublicName
        ]
    }

    socketio.emit(
        "chat-created",
        socket_data,
        to=userPublicName
    )

    socketio.emit(
        "chat-created",
        socket_data,
        to=targetPublicName
    )

    return {
        "success": True,
        "code": ERROR_KEY["success"],
        "message": "چت با موفقیت ایجاد شد.",
        "chat_id": new_chat.id,
        "chat_name": new_chat.chatname,
        "users": [
            userPublicName,
            targetPublicName
        ],
        "chat_data": new_chat.chats
    }


@app.route("/get-chat", methods=["POST"])
def get_chat():
    json_data = request.get_json(silent=True)

    if not json_data:
        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    username = json_data.get("username")

    if username is None:
        return {
            "success": False,
            "error": "لطفا نام کاربری را بفرستید.",
            "code": ERROR_KEY["null"]
        }

    user = User.query.filter_by(
        public_name=username
    ).first()

    if not user:
        return {
            "success": False,
            "error": "کاربر یافت نشد.",
            "code": ERROR_KEY["404"]
        }

    userChats = []

    if user.chats:
        for chat_name in user.chats:
            chat = Chat.query.filter_by(
                chatname=chat_name
            ).first()

            if chat:
                userChats.append({
                    "chat_name": chat.chatname,
                    "chat_data": chat.chats
                })

    if not userChats:
        return {
            "success": False,
            "error": "هیچ چتی برای این کاربر یافت نشد.",
            "code": ERROR_KEY["null"],
            "chats": []
        }

    return {
        "success": True,
        "code": ERROR_KEY["success"],
        "chats": userChats
    }


@app.route("/send-message", methods=["POST"])
def send_message():
    json_data = request.get_json(silent=True)

    if not json_data:
        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    from_public_name = json_data.get("fromPublicName")
    to_public_name = json_data.get("toPublicName")
    message = json_data.get("message")

    if (
        from_public_name is None
        or to_public_name is None
        or message is None
    ):
        return {
            "success": False,
            "error": "لطفا تمامی مقادیر را بفرستید.",
            "code": ERROR_KEY["null"]
        }

    return {
        "success": True,
        "code": ERROR_KEY["success"]
    }

@app.route("/main-login-checker")
def mainLoginChecker():
    l = []
    for user in User.query.all():
        l.append({"name": user.username, "public_name": user.password})
    return {"users": l}

@app.route("/check-password")
def checkPassword():
    password = request.args.get("password")
    print(str(password))
    for user in User.query.all():
        print(user.password)
        if user.password == str(password):
            return {"same": True}
    return {"same": False}

@app.route("/register")
def register():
    try:
        name = request.args.get("name", None)
        password = request.args.get("password", None)
        public_name = request.args.get("public_name", None)
        if name is None or password is None or public_name is None:
            return {"success": False, "error": "لطفا تمامی ورودی ها را وارد کنید."}
        else:
            user = User(username=name, password=password, public_name=public_name)
            db.session.add(user)
            db.session.commit()
            return {"success": True}
    except:
        return {'succes':False}

@app.route("/login")
def login():
    password = request.args.get("password", None)
    public_name = request.args.get("public_name", None)
    if password is None or public_name is None:
        return {"success": False, "error": "لطفا تمامی ورودی ها را وارد کنید."}
    else:
        user = User.query.filter_by(password=password, public_name=public_name)
        if user is not None:
            return {"success": True}
        return {"success": False, "error": "کاربری با این اطلاعات وجود ندارد."}

if __name__ == "__main__":
    socketio.run(app, debug=True, port=8080, host="0.0.0.0")