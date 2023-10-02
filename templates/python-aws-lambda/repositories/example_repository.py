from abc import ABC, abstractmethod
from typing import Dict, Optional, List
from models.example.example_model import Example, ExampleIM


class ExampleRepository(ABC):
  '''
    All repository layers must be defined by an interface to insure that actual and in-memory implementations of the layer has the same functions, params and 
    responses
  '''

  @abstractmethod
  def get_all_examples(self) -> List[Example]:
    return []
  
  @abstractmethod
  def create_example(self, example: ExampleIM) -> Example:
    return {}
  
  @abstractmethod
  def get_example_by_id(self, example_id: str) -> Example:
    return {}
  
  
