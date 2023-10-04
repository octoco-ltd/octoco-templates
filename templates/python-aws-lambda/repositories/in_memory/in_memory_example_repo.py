"""
Example in memory repo
"""
import logging
from datetime import datetime
from typing import List, Optional

from exceptions.database_exception import DatabaseException

from repositories.example_repository import ExampleRepository
from models.example.example_model import Example, ExampleIM


class InMemoryExampleRepository(ExampleRepository):
    """
    In memory version of the example repo which uses an list as its "database"
    This means that All operations are mimicked using list operations
    """

    def __init__(self) -> None:
        self._entries: List[Example] = []
        logging.info('In memory example repository with empty list')

    def seed_entries(self, entries: Optional[List[Example]]) -> None:
        """
        Replace existing list of Examples with a new one
        Will check the correct list of Examples is passed
        Will throw TypeError or ValueError if supplied entries value is invalid
        """

        logging.info('Seeding entries for in memory example repository with list: %s', entries)
        if entries is None:
            self.clear_entries()
        elif not isinstance(entries, list):
            logging.error('Attempt to supply invalid parameter type to seed_entries')
            raise TypeError('entries must be a list')
        elif len(entries) == 0:
            self.clear_entries()
        else:
            for entry in entries:
                if not isinstance(entry, Example):
                    logging.error('Attempt to supply invalid in entry in list to seed_entries')
                    raise TypeError('Entries must be a list of Example objects')

        self._entries = entries
        logging.info(
            'Successfully seeded entries for in memory example repository with list: %s',
            entries
        )

    def clear_entries(self) -> None:
        """
        clear the list
        """
        self._entries = []
        logging.info('Successfully cleared entries for in memory example repository')

    def get_all_examples(self) -> List[Example]:
        """
        return the list of defined Examples
        """
        # Mapping responses will raise errors if you somehow managed to store the wrong type
        # in the in-memory list
        return self._entries

    def create_example(self, example: ExampleIM) -> Example:
        """
        Create a new Example based on an ExampleIM
        """
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

        self._entries.append(Example(**example.__dict__))

        logging.info('Successfully created example: %s and added to the list', example)

        return Example(**example.__dict__)

    def get_example_by_id(self, example_id: str) -> Example:
        """
        Return the Example entry with the given ID
        """
        if example_id is None:
            raise ValueError('example_id cannot be None')
        if not isinstance(example_id, str):
            raise TypeError('example_id must be a string')

        example = None

        for entry in self._entries:
            if entry.id == example_id:
                example = entry
                break

        if example is None:
            logging.error('Example with ID %s not found', example_id)
            raise DatabaseException(f'Example with ID {example_id} not found')

        logging.info('Successfully found example with ID: %s', example_id)
        return Example(**example.__dict__)
