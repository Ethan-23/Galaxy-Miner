#!/usr/bin/python3
""" console """

import cmd
import models
from models.user import User
from os import getenv
import shlex  # for splitting the line along spaces except in double quotes
from pymongo import MongoClient

classes = {"User": User}


class GalaxyCommand(cmd.Cmd):
    """ Galaxy console """
    prompt = '(console) '

    def do_EOF(self, arg):
        """Exits console"""
        return True

    def emptyline(self):
        """ overwriting the emptyline method """
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True

    def _key_value_parser(self, args):
        """creates a dictionary from a list of strings"""
        new_dict = {}
        for arg in args:
            if "=" in arg:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1]
                new_dict[key] = value
        return new_dict

    def do_create(self, arg):
        """Creates a new instance of a class"""
        args = arg.split()
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            new_dict = self._key_value_parser(args[1:])
            instance = classes[args[0]](**new_dict)
        else:
            print("** class doesn't exist **")
            return False
        print(instance)
        instance.save()

    def do_show(self, arg):
        """Prints an instance as a string based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            try:
                print(models.storage.all())
            except Exception as e:
                print(e)
        else:
            print("** class doesn't exist **")

    def do_destroy(self, arg):
        """Deletes an instance based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                key = args[1]
                for index in range(0, len(models.storage.all())):
                    if key in models.storage.all()[index]['id']:
                        models.storage.delete(key)
                    else:
                        print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_update(self, arg):
        """Update an instance based on the class name, id, attribute & value"""
        args = shlex.split(arg)
        # connecting to db
        try:
            GALAXY_MONGO_HOST = getenv('GALAXY_MONGO_HOST')
            cluster = MongoClient(host=GALAXY_MONGO_HOST)
        except Exception as e:
            print(e)
            print("Can't connect")
        db = cluster['Galaxy']
        collection = db["User"]

        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                k = args[1]
                try:
                    for index in range(0, len(models.storage.all())):
                        obj = models.storage.all()[index]
                        if k in obj['id']:
                            if len(args) > 2:
                                if len(args) > 3:
                                    # getting old values
                                    oldvalues = {args[2]: obj[args[2]]}
                                    # getting new values
                                    newvalues = {"$set": {args[2]: args[3]}}
                                    # setting new values
                                    collection.update_one(oldvalues, newvalues)
                                else:
                                    print("** value missing **")
                            else:
                                print("** attribute name missing **")
                except Exception as e:
                    print(e)
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")


if __name__ == '__main__':
    GalaxyCommand().cmdloop()
