from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from sqlalchemy.ext.mutable import MutableDict
import os


# =========================================================
# APP
# =========================================================

app = Flask(__name__)

CORS(app)

app.secret_key = "flask_messanger_nakheir"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# =========================================================
# MYSQL DATABASE
# =========================================================
#
# نصب درایور:
#
# pip install pymysql
#
# فرمت:
# mysql+pymysql://USERNAME:PASSWORD@HOST/DATABASE
#

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:YOUR_PASSWORD@localhost/messenger"
)

db = SQLAlchemy(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)


# =========================================================
# ERROR KEYS
# =========================================================

ERROR_KEY = {
    "null": -1,
    "404": 0,
    "success": 1,
    "get": 2,
    "similar_data": 3,
    "unknown": 4
}


# =========================================================
# DATABASE MODELS
# =========================================================

class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        unique=False,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    public_name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    # لیست نام چت‌های کاربر
    chats = db.Column(
        MutableDict.as_mutable(db.JSON),
        nullable=False,
        default=lambda: {"chats": []}
    )


class Chat(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    chatname = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    chats = db.Column(
        MutableDict.as_mutable(db.JSON),
        nullable=False,
        default=lambda: {"chats": []}
    )


# =========================================================
# INIT DATABASE
# =========================================================

with app.app_context():
    db.create_all()


# =========================================================
# SOCKET.IO
# =========================================================

@socketio.on("connect")
def socket_connect():

    print("Socket connected")

    emit(
        "socket-connected",
        {
            "success": True,
            "message": "Socket connected successfully."
        }
    )


@socketio.on("disconnect")
def socket_disconnect():

    print("Socket disconnected")


# =========================================================
# JOIN USER ROOM
# =========================================================

@socketio.on("join-user")
def join_user(data):

    if not data:
        emit(
            "socket-error",
            {
                "success": False,
                "error": "داده‌ای ارسال نشده است."
            }
        )
        return

    public_name = data.get("public_name")

    if not public_name:

        emit(
            "socket-error",
            {
                "success": False,
                "error": "public_name ارسال نشده است."
            }
        )

        return

    # بررسی وجود کاربر
    user = User.query.filter_by(
        public_name=public_name
    ).first()

    if user is None:

        emit(
            "socket-error",
            {
                "success": False,
                "error": "کاربر یافت نشد."
            }
        )

        return

    # ورود کاربر به room مخصوص خودش
    join_room(public_name)

    print(
        f"User '{public_name}' joined socket room."
    )

    emit(
        "socket-ready",
        {
            "success": True,
            "public_name": public_name
        }
    )


# =========================================================
# CREATE CHAT
# =============



@app.route("/create-chat", methods=["POST"])
def create_chat():

    json_data = request.get_json(silent=True)

    if not json_data:

        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    userPublicName = json_data.get(
        "userPublicName"
    )

    targetPublicName = json_data.get(
        "targetPublicName"
    )

    if (
        not userPublicName
        or not targetPublicName
    ):

        return {
            "success": False,
            "error": "لطفا تمامی مقادیر را بفرستید.",
            "code": ERROR_KEY["null"]
        }

    # -----------------------------------------------------
    # USERS
    # -----------------------------------------------------

    userData = User.query.filter_by(
        public_name=userPublicName
    ).first()

    targetUserData = User.query.filter_by(
        public_name=targetPublicName
    ).first()

    if (
        userData is None
        or targetUserData is None
    ):

        return {
            "success": False,
            "error": "کاربر مورد نظر یافت نشد.",
            "code": ERROR_KEY["404"]
        }

    # -----------------------------------------------------
    # SAME USER
    # -----------------------------------------------------

    if userData.id == targetUserData.id:

        return {
            "success": False,
            "error": "نمی‌توانید با خودتان چت ایجاد کنید.",
            "code": ERROR_KEY["similar_data"]
        }

    # -----------------------------------------------------
    # CHAT NAME
    # -----------------------------------------------------

    chat_name_parts = sorted([
        userPublicName,
        targetPublicName
    ])

    chat_name = (
        f"{chat_name_parts[0]}_{chat_name_parts[1]}"
    )

    # -----------------------------------------------------
    # CHECK EXISTING CHAT
    # -----------------------------------------------------

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

    # -----------------------------------------------------
    # CREATE CHAT
    # -----------------------------------------------------

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

    # -----------------------------------------------------
    # USER CHATS
    # -----------------------------------------------------

    if not userData.chats:
        userData.chats = {"chats": []}

    if not targetUserData.chats:
        targetUserData.chats = {"chats": []}

    if chat_name not in userData.chats["chats"]:
        userData.chats["chats"].append(chat_name)

    if chat_name not in targetUserData.chats["chats"]:
        targetUserData.chats["chats"].append(chat_name)

    db.session.commit()

    # -----------------------------------------------------
    # SOCKET EVENT
    # -----------------------------------------------------

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

    # ارسال به کاربر اول
    socketio.emit(
        "chat-created",
        socket_data,
        to=userPublicName
    )

    # ارسال به کاربر دوم
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


# =========================================================
# GET CHATS
# =========================================================

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

    if not username:

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

        chat_names = user.chats.get(
            "chats",
            []
        )

        for chat_name in chat_names:

            chat = Chat.query.filter_by(
                chatname=chat_name
            ).first()

            if chat:

                userChats.append(
                    {
                        "chat_name": chat.chatname,
                        "chat_data": chat.chats
                    }
                )

    return {

        "success": True,

        "code": ERROR_KEY["success"],

        "chats": userChats
    }


# =========================================================
# SEND MESSAGE
# =========================================================

@app.route("/send-message", methods=["POST"])
def send_message():

    json_data = request.get_json(silent=True)

    if not json_data:

        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    from_public_name = json_data.get(
        "fromPublicName"
    )

    to_public_name = json_data.get(
        "toPublicName"
    )

    message = json_data.get(
        "message"
    )

    if (
        not from_public_name
        or not to_public_name
        or message is None
        or message == ""
    ):

        return {
            "success": False,
            "error": "لطفا تمامی مقادیر را بفرستید.",
            "code": ERROR_KEY["null"]
        }

    # -----------------------------------------------------
    # USERS
    # -----------------------------------------------------

    sender = User.query.filter_by(
        public_name=from_public_name
    ).first()

    receiver = User.query.filter_by(
        public_name=to_public_name
    ).first()

    if sender is None or receiver is None:

        return {
            "success": False,
            "error": "یکی از کاربران یافت نشد.",
            "code": ERROR_KEY["404"]
        }

    # -----------------------------------------------------
    # CHAT NAME
    # -----------------------------------------------------

    chat_name_parts = sorted([
        from_public_name,
        to_public_name
    ])

    chat_name = (
        f"{chat_name_parts[0]}_{chat_name_parts[1]}"
    )

    chat = Chat.query.filter_by(
        chatname=chat_name
    ).first()

    if chat is None:

        return {
            "success": False,
            "error": "چت وجود ندارد.",
            "code": ERROR_KEY["404"]
        }

    # -----------------------------------------------------
    # MESSAGE DATA
    # -----------------------------------------------------

    message_data = {

        "from": from_public_name,

        "to": to_public_name,

        "message": message
    }

    # -----------------------------------------------------
    # SAVE MESSAGE
    # -----------------------------------------------------

    if not chat.chats:
        chat.chats = {
            "chats": []
        }

    if "chats" not in chat.chats:
        chat.chats["chats"] = []

    chat_data = chat.chats["chats"]

    # چون ساختار فعلی چت یک آبجکت با target دارد،
    # پیام را داخل messages همان چت قرار می‌دهیم.

    if not chat_data:

        chat_data.append(
            {
                "target": to_public_name,
                "messages": [
                    message_data
                ]
            }
        )

    else:

        # پیدا کردن بخش messages
        chat_data[0].setdefault(
            "messages",
            []
        )

        chat_data[0]["messages"].append(
            message_data
        )

    db.session.commit()

    # -----------------------------------------------------
    # SOCKET DATA
    # -----------------------------------------------------

    socket_data = {

        "success": True,

        "chat_name": chat_name,

        "message": message_data
    }

    # -----------------------------------------------------
    # SEND TO RECEIVER
    # -----------------------------------------------------

    socketio.emit(
        "new-message",
        socket_data,
        to=to_public_name
    )

    # -----------------------------------------------------
    # SEND TO SENDER
    # -----------------------------------------------------

    socketio.emit(
        "new-message",
        socket_data,
        to=from_public_name
    )

    return {

        "success": True,

        "code": ERROR_KEY["success"],

        "message": "پیام با موفقیت ارسال شد.",

        "chat_name": chat_name,

        "data": message_data
    }


# =========================================================
# MAIN LOGIN CHECKER
# =========================================================

@app.route("/main-login-checker")
def mainLoginChecker():

    users = []

    for user in User.query.all():

        users.append(
            {
                "name": user.username,
                "public_name": user.public_name
            }
        )

    return {
        "users": users
    }


# =========================================================
# CHECK INPUT
# =========================================================

@app.route("/check-input")
def checkPassword():

    status = {
        "pass_same": False,
        "name_same": False
    }

    password = request.args.get(
        "password"
    )

    name = request.args.get(
        "name"
    )

    if password is None and name is None:
        return status

    for user in User.query.all():

        if (
            password is not None
            and user.password == str(password)
        ):

            status["pass_same"] = True

        if (
            name is not None
            and user.public_name == str(name)
        ):

            status["name_same"] = True

    return status


# =========================================================
# REGISTER
# =========================================================

@app.route("/register")
def register():

    name = request.args.get(
        "name"
    )

    password = request.args.get(
        "password"
    )

    public_name = request.args.get(
        "public_name"
    )

    if (
        name is None
        or password is None
        or public_name is None
    ):

        return {
            "success": False,
            "error": "لطفا تمامی ورودی‌ها را وارد کنید.",
            "code": ERROR_KEY["null"]
        }

    # -----------------------------------------------------
    # CHECK DUPLICATE PUBLIC NAME
    # -----------------------------------------------------

    existing_user = User.query.filter_by(
        public_name=public_name
    ).first()

    if existing_user:

        return {
            "success": False,
            "error": "این public_name قبلا استفاده شده است.",
            "code": ERROR_KEY["similar_data"]
        }

    # -----------------------------------------------------
    # CREATE USER
    # -----------------------------------------------------

    try:

        user = User(
            username=name,
            password=password,
            public_name=public_name,
            chats={



"chats": []
            }
        )

        db.session.add(user)

        db.session.commit()

        return {
            "success": True,
            "code": ERROR_KEY["success"]
        }

    except Exception as error:

        db.session.rollback()

        print(
            "REGISTER ERROR:",
            error
        )

        return {
            "success": False,
            "error": "خطایی هنگام ثبت‌نام رخ داد.",
            "code": ERROR_KEY["unknown"]
        }


# =========================================================
# LOGIN
# =========================================================

@app.route("/login")
def login():

    password = request.args.get(
        "password"
    )

    public_name = request.args.get(
        "public_name"
    )

    if (
        password is None
        or public_name is None
    ):

        return {
            "success": False,
            "error": "لطفا تمامی ورودی‌ها را وارد کنید.",
            "code": ERROR_KEY["null"]
        }

    user = User.query.filter_by(
        password=password,
        public_name=public_name
    ).first()

    print(
        user,
        password,
        public_name
    )

    if user is not None:

        user_back = {

            "public_name": user.public_name,

            "username": user.username
        }

        return {

            "success": True,

            "user": user_back
        }

    return {

        "success": False,

        "error": "کاربری با این اطلاعات وجود ندارد.",

        "code": ERROR_KEY["404"]
    }


# =========================================================
# RUN
# =========================================================

if name == "__main__":

    socketio.run(
        app,
        debug=True,
        port=8080,
        host="0.0.0.0"
    )