from flask import Blueprint, jsonify, request 
from database import db 



user_bp = Blueprint('user', __name__)



@user_bp.route('/api/user', methods=['GET'])
def get_users():

    return jsonify({"msg": "Todo bien"})

@user_bp.route('/api/register', methods=['POST'])
def register_user():

    return jsonify({"msg": "Register terminado"})

@user_bp.route('/api/login', methods=['POST'])
def login_user():

    return jsonify({"msg": "Inicio sesion terminado"})