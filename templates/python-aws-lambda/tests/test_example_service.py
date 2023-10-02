import pytest
from datetime import datetime
from repositories.example_repository import ExampleRepository
from repositories.in_memory.in_memory_example_repo import InMemoryExampleRepository
from models.example.example_model import Example, ExampleIM
from services.example_service import ExampleService

@pytest.fixture
def example_in_db():
    return Example(**dict(id='id1', createdAt=datetime.now(), name='example', email='example@example.com', isVerified=True))

@pytest.fixture
def example_repo():
    return InMemoryExampleRepository()

def test_that_an_example_can_be_fetched(example_repo: InMemoryExampleRepository, example_in_db: Example):
    example_repo.seed_entries([example_in_db])
    example_service = ExampleService(example_repo)
    result = example_service.get_example_by_id('id1')
    assert result == example_in_db

def test_that_all_examples_can_be_fetched(example_repo: InMemoryExampleRepository, example_in_db: Example):
    example_repo.seed_entries([example_in_db])
    example_service = ExampleService(example_repo)
    result = example_service.get_all_examples()
    assert len(result) == 1
    assert result[0] == example_in_db

def test_that_an_error_is_thrown_if_an_incorrect_id_is_used(example_repo: InMemoryExampleRepository, example_in_db: Example):
    '''
        TODO: Add correct error check
    '''
    example_repo.seed_entries([example_in_db])
    example_service = ExampleService(example_repo)
    with pytest.raises(Exception) as excinfo:  
        example_service.get_example_by_id('non-existent-id')
    assert str(excinfo.value) == "Example with ID non-existent-id not found"
    

def test_that_the_example_status_matches_the_verification_status(example_repo: InMemoryExampleRepository, example_in_db: Example):
    example_repo.seed_entries([example_in_db])
    example_service = ExampleService(example_repo)
    result = example_service.verification_checker('id1', True)
    assert result == "Example status matches verification status"

def test_that_the_example_status_does_not_match_the_verification_status(example_repo: InMemoryExampleRepository, example_in_db: Example):
    example_repo.seed_entries([example_in_db])
    example_service = ExampleService(example_repo)
    result = example_service.verification_checker('id1', False)
    assert result == "Example status does not match verification status"