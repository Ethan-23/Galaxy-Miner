#!/usr/bin/python3
"""
Contains the class DBStorage
"""
from hashlib import new

from flask.json import dump
from models.user import User
from os import getenv
from pymongo import MongoClient
from bson.json_util import dumps, loads

classes = {"User": User}


class DBStorage:
    """interaacts with the MONGO database"""
    __engine = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        try:
            GALAXY_MONGO_HOST = getenv('GALAXY_MONGO_HOST')
            cluster = MongoClient(host=GALAXY_MONGO_HOST)
        except Exception as e:
            print(e)
            print("can't connect (__init__)")
        db = cluster['Galaxy']
        collection = db["User"]
        self.__engine = collection

    def all(self, id=None, email=None):
        """query on the current database session"""
        try:
            if id is None and email is None:
                all_occur = self.__engine.find()
                new_list = list(all_occur)
                data = dumps(new_list)
                return data
            elif email is not None:
                cursor_email = self.__engine.find_one({"email": email})
                data = dumps(cursor_email)
                return data
            elif id is not None:
                one_occur = self.__engine.find_one({"id": id})
                data = dumps(one_occur)
                return data
        except Exception as e:
            print(e)
            print("** instance not found ** (all)")

    def new(self, obj):
        """add the object to the current database session"""
        try:
            new = obj.to_dict()
            self.__engine.insert_one(new)
        except Exception as e:
            print(e)
            print("new")

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        try:
            if obj is not None:
                self.__engine.remove({"id": obj})
        except Exception as e:
            print("delete")
            print(e)


    def update(self, id=None, attr=None):
        """updates specific attributes in the database"""
        try:
            if id is not None and attr is not None:
                self.__engine.update_one({"id": id}, {"$set": attr})
        except Exception as e:
            print(e)
            print("Update") 
