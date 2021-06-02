#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.base_model import BaseModel
from models.user import User
from os import getenv
from pymongo import MongoClient
import bson

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


    # def save(self):
    #     """commit all changes of the current database session"""
    #     try:
    #         self.__engine.insert_one(self)
    #     except Exception as e:
    #         print(e)
    #         print("save")


    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        try:
            if obj is not None:
                self.__engine.remove({"id": obj})
        except Exception as e:
            print("delete")
            print(e)

    # def reload(self):
    #     """reloads data from the database"""
    #     print("Save")

    # def close(self):
    #     """call remove() method on the private session attribute"""
    #     self.__session.remove()

    # def get(self, cls, id):
    #     """
    #     Returns the object based on the class name and its ID, or
    #     None if not found
    #     """
    #     if cls not in classes.values():
    #         return None

    #     all_cls = models.storage.all(cls)
    #     for value in all_cls.values(): 564704a6-f894-4281-a36b-f2a667d79403
    #         if (value.id == id):
    #             return value

    #     return None

    # def count(self, cls=None):
    #     """
    #     count the number of objects in storage
    #     """
    #     all_class = classes.values()

    #     if not cls:
    #         count = 0
    #         for clas in all_class:
    #             count += len(models.storage.all(clas).values())
    #     else:
    #         count = len(models.storage.all(cls).values())

    #     return count
