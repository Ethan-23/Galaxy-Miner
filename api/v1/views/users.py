#!/usr/bin/python3
"""index file"""

from api.v1.views import app_views
from flask import jsonify, abort
from models import storage
from models.user import User
import hashlib
from flask import request

@app_views.route("/users", methods=['GET'], strict_slashes=False)
def get_users():
    """All users"""
    users_dict = []
    for item in storage.all('User').values():
        users_dict.append(item.to_dict())
        return jsonify(states_dict)

@app_views.route("/users/<user_id>", methods=['GET'], strict_slashes=False)
def get_user(user_id=None):
    """User"""
    if storage.all('User', user_id) is None:
        abort(404)
    else:
        return jsonify(storage.all('User', user_id).to_dict())

@app_views.route("/users", methods=['POST'], strict_slashes=False)
def post_user():
    """state"""
    try:
        user_info = request.get_json()
    except:
        abort(400, 'Not a JSON')
        if user_info is None:
            abort(400, 'Not a JSON')
        elif "email" not in user_info.keys():
            abort(400, 'Missing username')
        elif "email" not in user_info.keys():
            abort(400, 'Missing email')
        elif "password" not in user_info.keys():
            abort(400, 'Missing password')
        else:
            new_user = User(email=user_info['email'],
                            password=user_info['password'],
                            username=user_info['username'])
            return jsonify(new_user.to_dict()), 201
