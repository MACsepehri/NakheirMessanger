from flask_restful import reqparse, fields

user_args = reqparse.RequestParser()

user_args.add_argument('user_name', type=str, required=True)
user_args.add_argument('name_user', type=str, required=True)
user_args.add_argument('user_password', type=str, required=True)

userFields = {
    'id' : fields.Integer,
    'user_name' : fields.String,
    'name_user' : fields.String,
}