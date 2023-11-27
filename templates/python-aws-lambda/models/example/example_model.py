from pydantic import BaseModel
from datetime import datetime


class ExampleIM(BaseModel):
  """
    Model for creating an Example document
  """

  # Models used to create documents are referred to as Insert Models (IM)
  
  name: str
  email: str
  isVerified: bool



class Example(ExampleIM):
  """
    The model which will be returned by the DB or in-memory repo
  """

  # Fields such as ID and createdAt are usually managed by the DB. For that reason we don't need these fields in the IM,
  # but the model which will be returned from the DB will contain these fields.

  id: str
  createdAt: datetime
