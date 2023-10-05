"""
MongoDB implementation of the {% modelName| capitalize %}Repository
"""
import logging
import os

from datetime import datetime
from typing import List

from models.{% modelName| lower %}.{% modelName| lower %}_model import {% modelName| capitalize %}, {% modelName| capitalize %}IM
from repositories.{% modelName| lower %}_repository import {% modelName| capitalize %}Repository

from exceptions.database_exception import DatabaseException

from pymongo import MongoClient


class Mongo{% modelName| capitalize %}Repository({% modelName| capitalize %}Repository):
    """
    The MongoDB implementation of the {% modelName| capitalize %}Repository
    """

    def __init__(self) -> None:
        self._db_client = MongoClient(os.environ.get("MONGO_URL")).get_database(
            'pokerbet'
        ).get_collection('users')
        logging.info('Connected to MongoDB for database named pokerbet')

    def get_all_{% modelName| lower %}s(self) -> List[{% modelName| capitalize %}]:
        """
        Return the list of defined {% modelName| capitalize %}s
        """
        {% modelName| lower %}s = self._db_client.find()
        return [{% modelName| capitalize %}(**entry) for entry in {% modelName| lower %}s]

    def create_{% modelName| lower %}(self, {% modelName| lower %}: {% modelName| capitalize %}IM) -> {% modelName| capitalize %}:
        if {% modelName| lower %} is None:
            raise ValueError('{% modelName| lower %} cannot be None')
        if not isinstance({% modelName| lower %}, {% modelName| capitalize %}IM):
            raise TypeError('{% modelName| lower %} must be an {% modelName| capitalize %}IM')
        {% modelName| lower %}_to_add = {
            'created_at': datetime.now(),
            'id': 'some-new-id'
        }

        # Add the fields that the DB would have
        {% modelName| lower %}.update({% modelName| lower %}_to_add)
        saved_{% modelName| lower %} = self._db_client.insert_one({% modelName| lower %}.__dict__)
        logging.info('{% modelName| capitalize %} with ID [%s] created', saved_{% modelName| lower %}.inserted_id)
        return {% modelName| lower %}

    def get_{% modelName| lower %}_by_id(self, {% modelName| lower %}_id: str) -> {% modelName| capitalize %}:
        """
        Return the {% modelName| capitalize %} with the given ID
        """
        {% modelName| lower %} = self._db_client.find_one({'id': {% modelName| lower %}_id})

        if {% modelName| lower %} is None:
            raise DatabaseException(f'{% modelName| capitalize %} with ID {{% modelName| lower %}_id} not found')

        return {% modelName| capitalize %}(**{% modelName| lower %})
