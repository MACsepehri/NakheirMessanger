from extensions.db_ext import db

class UserModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(20), unique=True, nullable=False)
    name_user = db.Column(db.String(20), unique=True, nullable=False)
    user_password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"User(user_name: {self.user_name} | name: {self.name_user} | password: {self.user_password}) "