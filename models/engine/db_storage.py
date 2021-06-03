#!/usr/bin/python3
"""
Contains the class DBStorage
"""
from models.user import User
from os import getenv
from pymongo import MongoClient

classes = {"User": User}


class DBStorage:
    """interaacts with the MONGO database"""
    __engine = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        GALAXY_MONGO_HOST = getenv('GALAXY_MONGO_HOST')
        cluster = MongoClient(host=GALAXY_MONGO_HOST)
        db = cluster['Galaxy']
        collection = db["User"]
        self.__engine = collection

    def all(self, cls=None):
        """query on the current database session"""
        try:
            new_list = []
            all_occur = self.__engine.find()
            for i in all_occur:
                new_list.append(i)
            return new_list
        except Exception as e:
            print(e)
            print("all")

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
