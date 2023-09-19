"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User
from api.utils import generate_sitemap, APIException
from passlib.hash import bcrypt_sha256
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError



api = Blueprint('api', __name__)

@api.route('/register', methods=["POST"])
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
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error interno", "error": str(error)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        email = body.get("email")
        password = body.get("password")

        if None in (email, password):
            return jsonify({"message": "Por favor, complete todos los campos"}), 400

        user = User.query.filter_by(email=email).one_or_none()

        if user and bcrypt_sha256.verify(password, user.password_hash):
            session['user_id'] = user.id
            token = create_access_token(identity=user.id)
            return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401

    except Exception as error:
        return jsonify({"message": "Error interno", "error": str(error)}), 500
    

@api.route("/private", methods=["GET"])
@jwt_required()
def get_protected_data():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    print(current_user_id)
    if user:
        return jsonify({
            **user.serialize(),
        }), 200
    else:
        return jsonify({"message" :"User not found"}), 404


if __name__ == '__main__':
    api.run(debug=True)