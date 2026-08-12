from flask import Flask, render_template, redirect, flash, session, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# routes
@app.route("/")
def index():
    pass

if __name__ == "__main__":
    app.run(debug=True)