"""
{% modelName| capitalize %} Service
"""
from typing import List

from repositories.{% modelName| lower %}_repository import {% modelName| capitalize %}Repository
from models.{% modelName| lower %}.{% modelName| lower %}_model import {% modelName| capitalize %}, {% modelName| capitalize %}IM


class {% modelName| capitalize %}Service():
    """
    Our services layer contains all of the business logic of the app.
    This layer's dependencies are passed via the constructor.
    When this layer is called by the handler layer it will be instantiated with the actual
        (HTTP/Mongo/DynamoDB etc) implementations of the repositories and clients.
    During testing we test each function in this layer by passing the in-memory versions
        of the repos and clients to it.
    The goal of testing is to test the logic that will run in production i.e. the services layer.
    """

    def __init__(self, {% modelName| lower %}_repo: {% modelName| capitalize %}Repository) -> None:
        self.{% modelName| lower %}_repo = {% modelName| lower %}_repo

    def get_all_{% modelName| lower %}s(self) -> List[{% modelName| capitalize %}]:
        """
        Return the list of defined {% modelName| capitalize %}s
        """
        return self.{% modelName| lower %}_repo.get_all_{% modelName| lower %}s()

    def get_{% modelName| lower %}_by_id(self, {% modelName| lower %}_id: str) -> {% modelName| capitalize %}:
        """
        Return the {% modelName| capitalize %} with the given ID
        """
        return self.{% modelName| lower %}_repo.get_{% modelName| lower %}_by_id({% modelName| lower %}_id)

    def create_{% modelName| lower %}(self, {% modelName| lower %}: {% modelName| capitalize %}IM) -> {% modelName| capitalize %}:
        """
        Create a new {% modelName| capitalize %} based on an {% modelName| capitalize %}IM
        """
        return self.{% modelName| lower %}_repo.create_{% modelName| lower %}({% modelName| lower %})

    def verification_checker(self, {% modelName| lower %}_id: str, verification_status: bool) -> str:
        """
        Just a stupid function to show how different logical steps must be tested
        """

        {% modelName| lower %}_in_db = self.{% modelName| lower %}_repo.get_{% modelName| lower %}_by_id({% modelName| lower %}_id)

        if {% modelName| lower %}_in_db.is_verified == verification_status:
            return "{% modelName| capitalize %} status matches verification status"
        else:
            return "{% modelName| capitalize %} status does not match verification status"
