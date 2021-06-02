#!/usr/bin/python3
""" holds class User"""

import models
from models.base_model import BaseModel
from os import getenv
from hashlib import md5


class User(BaseModel):
    """Representation of a user """
    # if models.storage_t == 'db':
    #     __tablename__ = 'users'
    #     email = Column(String(128), nullable=False)
    #     password = Column(String(128), nullable=False)
    #     first_name = Column(String(128), nullable=True)
    #     last_name = Column(String(128), nullable=True)
    #     places = relationship("Place", backref="user")
    #     reviews = relationship("Review", backref="user")
    # else:
    email = ""
    password = ""
    first_name = ""
    last_name = ""
    resource = None
    drill_speed = None
    drill_size = None


    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
