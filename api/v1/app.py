#!/usr/bin/python3
"""Flask Setup"""
from models.user import User
from models import storage
from flask import Flask
from flask import request, jsonify
from os import environ
from api.v1.views import app_views
from flask_cors import CORS

app = Flask(__name__)
# CORS instance
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views)


# @app.teardown_appcontext
# def close(self):
#     DBstorage.close()
    
    
@app.errorhandler(404)
def page_not_found(err):
    """404 error"""
    return jsonify({"error": "Not found"}), 404

    
@app.errorhandler(400)
def page_not_found2(err):
    """400 error"""
    return jsonify({"error": err.description}), 400


if __name__ == "__main__":
    env_host = environ.get('GALAXY_HOST', default='localhost')
    env_port = environ.get('GALAXY_PORT', default='5000')
    app.run(host=env_host, port=int(env_port), threaded=True)
