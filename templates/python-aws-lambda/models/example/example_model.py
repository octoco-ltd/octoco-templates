"""
Example models
"""
from datetime import datetime

from pydantic import BaseModel


class {% modelName| capitalize %}IM(BaseModel):
    """
    Model for creating an {% modelName| capitalize %} document
    """

    # Models used to create documents are referred to as Insert Models (IM)

    name: str
    email: str
    is_verified: bool

    def __str__(self) -> str:
        response = {
            '{% modelName| capitalize %}IM': {
                'name': self.name,
                'email': self.email,
                'is_verified': self.is_verified
            }
        }

        return str(response)


class {% modelName| capitalize %}({% modelName| capitalize %}IM):
    """
    The model which will be returned by the DB or in-memory repo
    """

    # Fields such as ID and created_at are usually managed by the DB.
    # For that reason we don't need these fields in the IM,
    # but the model which will be returned from the DB will contain these fields.

    id: str
    created_at: datetime

    def __str__(self) -> str:
        response = {
            '{% modelName| capitalize %}': {
                'id': self.id,
                'created_at': self.created_at,
                'name': self.name,
                'email': self.email,
                'is_verified': self.is_verified
            }
        }

        return str(response)
