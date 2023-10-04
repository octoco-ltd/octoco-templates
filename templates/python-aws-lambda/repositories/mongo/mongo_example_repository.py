"""
MongoDB implementation of the ExampleRepository
"""
import logging
import os

from datetime import datetime
from typing import List

from models.example.example_model import Example, ExampleIM
from repositories.example_repository import ExampleRepository

from exceptions.database_exception import DatabaseException

from pymongo import MongoClient


class MongoExampleRepository(ExampleRepository):
    """
    The MongoDB implementation of the ExampleRepository
    """

    def __init__(self) -> None:
        self._db_client = MongoClient(os.environ.get("MONGO_URL")).get_database(
            'pokerbet'
        ).get_collection('users')
        logging.info('Connected to MongoDB for database named pokerbet')

    def get_all_examples(self) -> List[Example]:
        """
        Return the list of defined Examples
        """
        examples = self._db_client.find()
        return [Example(**entry) for entry in examples]

    def create_example(self, example: ExampleIM) -> Example:
        if example is None:
            raise ValueError('example cannot be None')
        if not isinstance(example, ExampleIM):
            raise TypeError('example must be an ExampleIM')
        example_to_add = {
            'created_at': datetime.now(),
            'id': 'some-new-id'
        }

        # Add the fields that the DB would have
        example.update(example_to_add)
        saved_example = self._db_client.insert_one(example.__dict__)
        logging.info('Example with ID [%s] created', saved_example.inserted_id)
        return example

    def get_example_by_id(self, example_id: str) -> Example:
        """
        Return the Example with the given ID
        """
        example = self._db_client.find_one({'id': example_id})

        if example is None:
            raise DatabaseException(f'Example with ID {example_id} not found')

        return Example(**example)
