#!/usr/bin/python3
"""index file"""

from pymongo.message import update
from api.v1.views import app_views
from flask import jsonify, abort
from models import storage
from models.user import User
from flask import request


@app_views.route("/users", methods=['GET'], strict_slashes=False)
def get_users():
    """All users"""
    if storage.all() is None:
        abort(404)
    else:
        return (storage.all())

@app_views.route("/users/id/<user_id>", methods=['GET'], strict_slashes=False)
def get_user(user_id=None):
    """User"""
    try:
        return (storage.all(id=user_id))
    except:
        abort(404)


@app_views.route("/users/email/<user_email>", methods=['GET'], strict_slashes=False)
def get_user_email(user_email=None):
    """User"""
    try:
        return (storage.all(email=user_email))
    except:
        abort(404)


@app_views.route("/users", methods=['POST'], strict_slashes=False)
def post_user():
    """state"""
    try:
        user_info = request.get_json()
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
            storage.new(new_user)
            return jsonify(new_user.to_dict()), 201
    except:
        abort(400, 'Not a JSON')


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.all(id=user_id)
    if not user:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    attributes = request.get_json()
    storage.update(id=user_id, attr=attributes)
    return jsonify(user), 200
