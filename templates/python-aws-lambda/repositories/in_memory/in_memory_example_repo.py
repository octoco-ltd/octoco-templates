"""
{% modelName| capitalize %} in memory repo
"""
import logging
from datetime import datetime
from typing import List, Optional

from exceptions.database_exception import DatabaseException

from repositories.{% modelName| lower %}_repository import {% modelName| capitalize %}Repository
from models.{% modelName| lower %}.{% modelName| lower %}_model import {% modelName| capitalize %}, {% modelName| capitalize %}IM


class InMemory{% modelName| capitalize %}Repository({% modelName| capitalize %}Repository):
    """
    In memory version of the {% modelName| lower %} repo which uses an list as its "database"
    This means that All operations are mimicked using list operations
    """

    def __init__(self) -> None:
        self._entries: List[{% modelName| capitalize %}] = []
        logging.info('In memory {% modelName| lower %} repository with empty list')

    def seed_entries(self, entries: Optional[List[{% modelName| capitalize %}]]) -> None:
        """
        Replace existing list of {% modelName| capitalize %}s with a new one
        Will check the correct list of {% modelName| capitalize %}s is passed
        Will throw TypeError or ValueError if supplied entries value is invalid
        """

        logging.info('Seeding entries for in memory {% modelName| lower %} repository with list: %s', entries)
        if entries is None:
            self.clear_entries()
        elif not isinstance(entries, list):
            logging.error('Attempt to supply invalid parameter type to seed_entries')
            raise TypeError('entries must be a list')
        elif len(entries) == 0:
            self.clear_entries()
        else:
            for entry in entries:
                if not isinstance(entry, {% modelName| capitalize %}):
                    logging.error('Attempt to supply invalid in entry in list to seed_entries')
                    raise TypeError('Entries must be a list of {% modelName| capitalize %} objects')

        self._entries = entries
        logging.info(
            'Successfully seeded entries for in memory {% modelName| lower %} repository with list: %s',
            entries
        )

    def clear_entries(self) -> None:
        """
        clear the list
        """
        self._entries = []
        logging.info('Successfully cleared entries for in memory {% modelName| lower %} repository')

    def get_all_{% modelName| lower %}s(self) -> List[{% modelName| capitalize %}]:
        """
        return the list of defined {% modelName| capitalize %}s
        """
        # Mapping responses will raise errors if you somehow managed to store the wrong type
        # in the in-memory list
        return self._entries

    def create_{% modelName| lower %}(self, {% modelName| lower %}: {% modelName| capitalize %}IM) -> {% modelName| capitalize %}:
        """
        Create a new {% modelName| capitalize %} based on an {% modelName| capitalize %}IM
        """
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

        self._entries.append({% modelName| capitalize %}(**{% modelName| lower %}.__dict__))

        logging.info('Successfully created {% modelName| lower %}: %s and added to the list', {% modelName| lower %})

        return {% modelName| capitalize %}(**{% modelName| lower %}.__dict__)

    def get_{% modelName| lower %}_by_id(self, {% modelName| lower %}_id: str) -> {% modelName| capitalize %}:
        """
        Return the {% modelName| capitalize %} entry with the given ID
        """
        if {% modelName| lower %}_id is None:
            raise ValueError('{% modelName| lower %}_id cannot be None')
        if not isinstance({% modelName| lower %}_id, str):
            raise TypeError('{% modelName| lower %}_id must be a string')

        {% modelName| lower %} = None

        for entry in self._entries:
            if entry.id == {% modelName| lower %}_id:
                {% modelName| lower %} = entry
                break

        if {% modelName| lower %} is None:
            logging.error('{% modelName| capitalize %} with ID %s not found', {% modelName| lower %}_id)
            raise DatabaseException(f'{% modelName| capitalize %} with ID {{% modelName| lower %}_id} not found')

        logging.info('Successfully found {% modelName| lower %} with ID: %s', {% modelName| lower %}_id)
        return {% modelName| capitalize %}(**{% modelName| lower %}.__dict__)
