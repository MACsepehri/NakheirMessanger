from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os

# init Flask and Flask-SQLAlchemy
app = Flask(__name__)
app.secret_key = "flask_messanger_nakheir"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (f"sqlite:///{os.path.join(basedir, 'database.db')}")
db = SQLAlchemy(app)

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
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    public_name = db.Column(db.String, unique=True, nullable=False)

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chats = db.Column(db.JSON, nullable=False, default=lambda: {"chats": []})

# init of database
with app.app_context():
    db.create_all()

# routes
@app.route("/api-login", methods=["POST"])
def api_login():
    json_data = request.get_json(silent=True)

    if not json_data:
        return {
            "success": False,
            "error": "داده‌ای ارسال نشده است.",
            "code": ERROR_KEY["null"]
        }

    username = json_data.get("username")
    email = json_data.get("email")
    password = json_data.get("password")
    public_name = json_data.get("public_name")

    if (
        username is None
        or email is None
        or password is None
        or public_name is None
    ):
        return {"success": False, "error": "لطفا تمامی مقادیر را بفرستید.", "code": ERROR_KEY["null"]}

    user = User.query.filter_by(username=username).first()

    if user:
        if (
            user.email == email
            and user.password == password
            and user.public_name == public_name
        ):

            return {
                "success": True,
                "action": "login",
                "userData": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "public_name": user.public_name
                },
                "code": ERROR_KEY["success"]
            }

        return {"success": False, "error": "اطلاعات ورود اشتباه است.", "code": ERROR_KEY["404"]}

    email_exists = User.query.filter_by(email=email).first()
    public_name_exists = User.query.filter_by(public_name=public_name).first()


    if email_exists or public_name_exists:
        return {"success": False, "error": "نام کاربری، ایمیل یا نام عمومی قبلا استفاده شده است.", "code": ERROR_KEY["similar_data"]}

    new_user = User(username=username, email=email, password=password, public_name=public_name)

    db.session.add(new_user)
    db.session.commit()


    return {
        "success": True,
        "action": "register",
        "userData": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "public_name": new_user.public_name
        },
        "code": ERROR_KEY["success"]
    }

@app.route("/send-message", methods=["POST"])
def send_message():

    json_data = request.get_json(silent=True)

    if not json_data:
        return {"success": False, "error": "داده‌ای ارسال نشده است.", "code": ERROR_KEY["null"]}

    from_public_name = json_data.get("fromPublicName")
    to_public_name = json_data.get("toPublicName")
    message = json_data.get("message")


    if (
        from_public_name is None
        or to_public_name is None
        or message is None
    ):
        return {"success": False, "error": "لطفا تمامی مقادیر را بفرستید.", "code": ERROR_KEY["null"]}


    return {"success": True, "code": ERROR_KEY["success"]}

if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0")