"""
Abstract class/Interface for repositories
"""
from typing import List

from abc import ABC, abstractmethod

from models.{% modelName| lower %}.{% modelName| lower %}_model import {% modelName| capitalize %}, {% modelName| capitalize %}IM

class {% modelName| capitalize %}Repository(ABC):
    """
    All repository layers must be defined by an interface to insure that actual and
    in-memory implementations of the layer has the same functions, params and responses
    """

    @abstractmethod
    def get_all_{% modelName| lower %}s(self) -> List[{% modelName| capitalize %}]:
        """
        Abstract method to return the list of defined {% modelName| capitalize %}s
        """

    @abstractmethod
    def create_{% modelName| lower %}(self, {% modelName| lower %}: {% modelName| capitalize %}IM) -> {% modelName| capitalize %}:
        """
        Abstract method to create a new {% modelName| capitalize %} based on an {% modelName| capitalize %}IM
        """

    @abstractmethod
    def get_{% modelName| lower %}_by_id(self, {% modelName| lower %}_id: str) -> {% modelName| capitalize %}:
        """
        Abstract method to return the {% modelName| capitalize %} with the given ID
        """
