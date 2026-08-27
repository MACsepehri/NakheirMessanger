from flask_restful import Resource, marshal_with, abort
from classes.user_class import UserModel
from arguments.userArgs import user_args, userFields
from extensions.db_ext import db
from argon2 import PasswordHasher

ph = PasswordHasher()

class SignUp(Resource):
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        password_hash = ph.hash(args["user_password"])
        user = UserModel(user_name=args["user_name"], name_user=args["name_user"], user_password=password_hash)
        db.session.add(user)
        db.session.commit()
        users = UserModel.query.all()
        return users, 201 
        

class SignIn(Resource):
    def post(self):
        args = user_args.parse_args()
        user = UserModel.query.filter_by(name_user=args["name_user"], user_name=args["user_name"]).first()
        if not user:
            abort(404, message="User not found")
        try:
            ph.verify(
                user.user_password,
                args["user_password"]
            )
        except :
            abort(401, message="Invalid password")

        return {
            "message": "Login successful",
            "user_id": user.id,
            "can_login": True
        }