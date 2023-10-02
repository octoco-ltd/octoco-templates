from repositories.example_repository import ExampleRepository
from models.example.example_model import Example, ExampleIM
from typing import List
from datetime import datetime

class InMemoryExampleRepository(ExampleRepository):
  '''
    In memory version of the example repo which uses an list as its "database"
    All operations are mimiced using list operations
  '''

  def __init__(self) -> None:
    self._entries: List[Example] = []

  def seed_entries(self, entries: List[Example]) -> None:
    self._entries = entries

  def clear_entries(self) -> None:
    self._entries = []

  def get_all_examples(self) -> List[Example]:
    # Mapping responses will raise errors if you somehow managed to store the wrong type
    # in the in-memory list
    return [Example(**entry.__dict__) for entry in self._entries]
  
  def create_example(self, example: ExampleIM) -> Example:
    example_to_add = {
      'createdAt': datetime.now(),
      'id': 'some-new-id'
    }

    # Add the fields that the DB would have
    example.update(example_to_add)

    self._entries = self._entries.append(Example(**example.__dict__))

    return Example(**example.__dict__)
  

  def get_example_by_id(self, example_id: str) -> Example:
    example = None

    for e in self._entries:
      if e.id == example_id:
        example = e

    # TODO: don't just raise a generic exception
    if example is None:
      raise Exception(f'Example with ID {example_id} not found')
    
    return Example(**example.__dict__)
    

  