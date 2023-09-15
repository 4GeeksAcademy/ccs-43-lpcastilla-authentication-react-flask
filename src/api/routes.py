"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt
from passlib.hash import bcrypt_sha256
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError



api = Blueprint('api', __name__)


@api.route('/signup', methods=["POST"])
def signup():
    
    try:
        body = request.get_json()
        print("Request body:", body)
        
        email = body.get("email")
        password = body.get("password")
        
        if None in (email, password):
            return jsonify({"message": "Por favor, complete todos los campos"}), 400
        

        password_hash = bcrypt_sha256.hash(password)
        
        user_exist = User.query.filter_by(email=email).one_or_none()
        if user_exist:
            return jsonify({"message": "Usuario ya existe"}), 400
        
        new_user = User(
            email=email,
            password_hash=password_hash
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Usuario ya existe"}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error interno", "error": str(error)}), 500


#@api.route("/login", methods=["POST"])
#def login():
    #username = request.json.get("username", None)
    #password = request.json.get("password", None)
    #if username != "test" or password != "test":
    #    return jsonify({"msg": "Bad username or password"}), 401

   # access_token = create_access_token(identity=username)
   # return jsonify(access_token=access_token)