from flask_sqlalchemy import SQLAlchemy
import bcrypt
from passlib.hash import bcrypt_sha256

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def verify_password(self, password):
        return bcrypt_sha256.verify(password, self.password_hash)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }