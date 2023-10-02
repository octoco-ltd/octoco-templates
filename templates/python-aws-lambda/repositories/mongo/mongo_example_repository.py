from models.example.example_model import Example, ExampleIM
from repositories.example_repository import ExampleRepository
from typing import List
from pymongo import MongoClient
import os

class MongoExampleRepository(ExampleRepository):
  '''
    The MongoDB implementation of the ExampleRepository
  '''
  def __init__(self) -> None:
    self.db = MongoClient(os.environ.get("MONGO_URL")).get_database('pokerbet').get_collection('users')
    
  
  def get_all_examples(self) -> List[Example]:
    examples = self.db.find()
    return [Example(**e) for e in examples]
  
  def create_example(self, example: ExampleIM) -> Example:
    saved_example = self.db.insert_one(example.__dict__)
    return Example(**saved_example)
  
  def get_example_by_id(self, example_id: str) -> Example:
    example = self.db.find_one({'id': example_id})

    # Raise a better error
    if example is None:
      raise Exception(f'Example with ID {example_id} not found')
    
    return Example(**example)