from flask import Flask
from extensions.db_ext import db
from flask_restful import Resource, Api , reqparse, fields, marshal_with, abort
from API.sign import SignUp, SignIn

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://lemon:12345_Ttp@127.0.0.1:3306/nakheir"
api = Api(app)
db.init_app(app)

api.add_resource(SignUp, '/api/signup/')
api.add_resource(SignIn, '/api/signin/')

if __name__ == '__main__':
    app.run(debug=True)