from flask import Blueprint, jsonify, request
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/user', methods=['GET'])
def get_users():

    return jsonify({"msg": "Todo bien"})

@user_bp.route('/api/user/register', methods=['POST'])
def register_user():
    body = request.get_json()

    name= body.get('name').strip()
    email= body.get('email').strip()
    password= body.get('password',)

    new_user = User(
        name=name, 
        email=email, 
        password=generate_password_hash(password),
        )

    db.session.add(new_user)
    db.session.commit()


    return jsonify({"msg": "Registro  terminado"})

@user_bp.route('/api/login', methods=['POST'])
def login_user():
    body = request.get_json()

    email = body.get('email').strip()
    password = body.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({"msg": "Inicio de sesion terminado"})
    else:
        return jsonify({"msg": "Credenciales invalidas"}), 401

@user_bp.route('/api/user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    body = request.get_json()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    name = body.get('name', user.name).strip()
    email = body.get('email', user.email).strip()
    password = body.get('password', None)

    user.name = name
    user.email = email

    if password:
        user.password = generate_password_hash(password)

    db.session.commit()

    return jsonify({"msg": "Usuario actualizado correctamente"}), 200

@user_bp.route('/api/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "Usuario eliminado correctamente"}), 200

import secrets
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText

# ... (Tus rutas anteriores de GET, REGISTER, LOGIN, PUT y DELETE se quedan exactamente igual) ...

def send_reset_email(user_email, token):
    """Función auxiliar para enviar el correo utilizando un servidor SMTP"""
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "tu_correo@gmail.com"
    sender_password = "tu_contraseña_de_aplicacion" # Token generado en tu cuenta de Google, no tu clave normal
    
    # Enlace que apunta directamente a la pantalla que creamos en Next.js
    reset_url = f"http://localhost:3000/restablecer?token={token}"
    
    msg = MIMEText(f"Hola.\n\nHas solicitado restablecer tu contraseña para FIFA 2026 Analytics.\n\n"
                   f"Haz clic en el siguiente enlace para cambiar tu contraseña:\n{reset_url}\n\n"
                   f"Este enlace expirará en 15 minutos. Si no fuiste tú, simplemente ignora este mensaje.")
    
    msg['Subject'] = "Recuperación de Contraseña - FIFA 2026 Analytics"
    msg['From'] = sender_email
    msg['To'] = user_email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls() # Cifrado seguro TLS
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, user_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Error enviando correo por SMTP: {e}")
        return False


@user_bp.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    body = request.get_json()
    email = body.get('email').strip()

    user = User.query.filter_by(email=email).first()

    # Seguridad: Si el correo no existe, devolvemos el mismo mensaje de éxito.
    # Así evitamos que atacantes comprueben qué correos están registrados en tu sistema.
    if not user:
        return jsonify({"msg": "Si el correo está registrado, recibirás un enlace de recuperación pronto."})

    # Generamos un token aleatorio seguro y lo guardamos con su expiración (+15 minutos)
    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(minutes=15)
    db.session.commit()

    # Intentamos enviar el correo electrónico
    email_enviado = send_reset_email(user.email, token)
    if not email_enviado:
         return jsonify({"msg": "Error al enviar el correo de recuperación"}), 500

    return jsonify({"msg": "Si el correo está registrado, recibirás un enlace de recuperación pronto."})


@user_bp.route('/api/reset-password', methods=['POST'])
def reset_password():
    body = request.get_json()
    token = body.get('token')
    new_password = body.get('password')

    # Buscamos al usuario que posee ese token único
    user = User.query.filter_by(reset_token=token).first()

    # Validamos que el token exista en nuestra BD y que la hora actual no supere el límite de expiración
    if not user or user.reset_token_expiry < datetime.utcnow():
        return jsonify({"msg": "El enlace es inválido o ha expirado"}), 400

    # Hasheamos la nueva contraseña usando la misma función que usas en el registro
    user.password = generate_password_hash(new_password)
    
    # Limpiamos los campos para que este token quede inutilizable de inmediato
    user.reset_token = None
    user.reset_token_expiry = None
    db.session.commit()

    return jsonify({"msg": "Contraseña actualizada correctamente"}), 200