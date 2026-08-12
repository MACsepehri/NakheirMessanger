from flask import Flask, render_template, redirect, flash, session, request
from flask_sqlalchemy import SQLAlchemy
import extensions
import os

# init of flask and flask-sqlalchamy
app = Flask(__name__)
app.secret_key = "flask_messanger_nakheir"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, 'database.db')}"
db = SQLAlchemy(app)

# database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)
    public_name = db.Column(db.String, unique=True, nullable=False)

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chats = db.Column(db.JSON, nullable=False, default=lambda: {"chats": []})

# create db
with app.app_context():
    db.create_all()

# routes
@app.route("/send-message", methods=["GET"])
def send_message():
    # check method
    method = request.method.lower()
    if method == "post":
        json_data = request.get_json()
        fromPublicName = json_data.get("fromPublicName")
        toPublicName = json_data.get("toPublicName")
        message = json_data.get("message")

        # send an error if anything was 'None'
        if fromPublicName == None or toPublicName == None or message == None:
            return {"success" : False, "error": "لطفا تمامی مقادیر را بفرستید."}

        # send message
        return {"success" : True}

    # cannot handle get method
    return {"success" : False, "error": "متد GET پذیرفته نیست."}

@app.route("/check-session", methods=["POST"])
def checkSession():
    # method
    method = request.method.lower()
    if method == "post":
        jsonData = request.get_json()
        name = jsonData.get("name")
        email = jsonData.get("email")
        password = jsonData.get("password")
        public_name = jsonData.get("public_name")
        result = User.query.filter_by(username=name, email=email, password=password, public_name=public_name)
        if result == None: return {"success" : False, "error": "کاربر پیدا نشد."}
        return {"success" : True, "userData" : {"name": result.name, "email": result.email, "password": result.password, "public_name": public_name}}
    return {"success" : False, "error": "متد GET پذیرفته شد."}

if __name__ == "__main__":
    app.run(debug=True)