from repositories.example_repository import ExampleRepository
from models.example.example_model import Example, ExampleIM
from typing import List


class ExampleService():
  '''
    Our services layer contans all of the business logic of the app. This layer's dependencies are passed via the constructor.
    When this layer is called by the handler layer it will be instantiated with the actual (HTTP/Mongo/DynamoDB etc) implementations
    of the repositories and clients. During testing we test each function in this layer by passing the in-memory versions
    of the repos and clients to it. The goal of testing is to test the logic that will run in production i.e. the services layer.
  '''

  def __init__(self, example_repo: ExampleRepository) -> None:
    self.example_repo = example_repo
  
  def get_all_examples(self) -> List[Example]:
    return self.example_repo.get_all_examples()
  
  def get_example_by_id(self, example_id: str) -> Example:
    return self.example_repo.get_example_by_id(example_id)
  
  def create_example(self, example: ExampleIM) -> Example:
    return self.example_repo.create_example(example)
  
  def verification_checker(self, example_id: str, verification_status: bool) -> str:
    '''
      Just a stupid function to show how different logical steps must be tested
    '''

    example_in_db = self.example_repo.get_example_by_id(example_id)

    if example_in_db.isVerified == verification_status:
      return "Example status matches verification status"
    else:
      return "Example status does not match verification status"
  
