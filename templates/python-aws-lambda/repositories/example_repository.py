"""
Abstract class/Interface for repositories
"""
from typing import List

from abc import ABC, abstractmethod

from models.example.example_model import Example, ExampleIM

class ExampleRepository(ABC):
    """
    All repository layers must be defined by an interface to insure that actual and
    in-memory implementations of the layer has the same functions, params and responses
    """

    @abstractmethod
    def get_all_examples(self) -> List[Example]:
        """
        Abstract method to return the list of defined Examples
        """

    @abstractmethod
    def create_example(self, example: ExampleIM) -> Example:
        """
        Abstract method to create a new Example based on an ExampleIM
        """

    @abstractmethod
    def get_example_by_id(self, example_id: str) -> Example:
        """
        Abstract method to return the Example with the given ID
        """
