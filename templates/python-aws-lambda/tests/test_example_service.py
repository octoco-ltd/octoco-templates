"""
Unit test for {% modelName| capitalize %}Service for in memory repositories
"""
import pytest

from datetime import datetime

from repositories.{% modelName| lower %}_repository import {% modelName| capitalize %}Repository
from repositories.in_memory.in_memory_{% modelName| lower %}_repo import InMemory{% modelName| capitalize %}Repository
from models.{% modelName| lower %}.{% modelName| lower %}_model import {% modelName| capitalize %}
from services.{% modelName| lower %}_service import {% modelName| capitalize %}Service


@pytest.fixture
def {% modelName| lower %}_in_db():
    """
    Create and return an {% modelName| capitalize %} model
    """
    return {% modelName| capitalize %}(**dict(
        id='id1',
        created_at=datetime.now(),
        name='example',
        email='example@example.com',
        is_verified=True
    ))


@pytest.fixture
def {% modelName| lower %}_repo():
    """
    Create and return the InMemory{% modelName| capitalize %}Repository
    """
    return InMemory{% modelName| capitalize %}Repository()


def test_that_an_{% modelName| lower %}_can_be_fetched(
        {% modelName| lower %}_repo: {% modelName| capitalize %}Repository,
        {% modelName| lower %}_in_db: {% modelName| capitalize %}
    ):
    """
    Test that an {% modelName| capitalize %} can be fetched
    """
    {% modelName| lower %}_repo.seed_entries([{% modelName| lower %}_in_db])
    {% modelName| lower %}_service = {% modelName| capitalize %}Service({% modelName| lower %}_repo)
    result = {% modelName| lower %}_service.get_{% modelName| lower %}_by_id('id1')
    assert result == {% modelName| lower %}_in_db


def test_that_all_{% modelName| lower %}s_can_be_fetched(
        {% modelName| lower %}_repo: InMemory{% modelName| capitalize %}Repository,
        {% modelName| lower %}_in_db: {% modelName| capitalize %}
    ):
    """
    Test that all {% modelName| capitalize %}s can be fetched
    """
    {% modelName| lower %}_repo.seed_entries([{% modelName| lower %}_in_db])
    {% modelName| lower %}_service = {% modelName| capitalize %}Service({% modelName| lower %}_repo)
    result = {% modelName| lower %}_service.get_all_{% modelName| lower %}s()
    assert len(result) == 1
    assert result[0] == {% modelName| lower %}_in_db


def test_that_an_error_is_thrown_if_an_incorrect_id_is_used(
        {% modelName| lower %}_repo: InMemory{% modelName| capitalize %}Repository,
        {% modelName| lower %}_in_db: {% modelName| capitalize %}
    ):
    """
    Test that an error is thrown if an incorrect ID is used
    TODO: Add correct error check
    """
    {% modelName| lower %}_repo.seed_entries([{% modelName| lower %}_in_db])
    {% modelName| lower %}_service = {% modelName| capitalize %}Service({% modelName| lower %}_repo)
    with pytest.raises(Exception) as exception:
        {% modelName| lower %}_service.get_{% modelName| lower %}_by_id('non-existent-id')
    assert str(exception.value) == "{% modelName| capitalize %} with ID non-existent-id not found"


def test_that_the_{% modelName| lower %}_status_matches_the_verification_status(
        {% modelName| lower %}_repo: InMemory{% modelName| capitalize %}Repository,
        {% modelName| lower %}_in_db: {% modelName| capitalize %}
    ):
    """
    Test that the {% modelName| capitalize %} status matches the verification status
    """
    {% modelName| lower %}_repo.seed_entries([{% modelName| lower %}_in_db])
    {% modelName| lower %}_service = {% modelName| capitalize %}Service({% modelName| lower %}_repo)
    result = {% modelName| lower %}_service.verification_checker('id1', True)
    assert result == "{% modelName| capitalize %} status matches verification status"


def test_that_the_{% modelName| lower %}_status_does_not_match_the_verification_status(
        {% modelName| lower %}_repo: InMemory{% modelName| capitalize %}Repository,
        {% modelName| lower %}_in_db: {% modelName| capitalize %}
    ):
    """
    Test that the {% modelName| capitalize %} status does not match the verification status
    """
    {% modelName| lower %}_repo.seed_entries([{% modelName| lower %}_in_db])
    {% modelName| lower %}_service = {% modelName| capitalize %}Service({% modelName| lower %}_repo)
    result = {% modelName| lower %}_service.verification_checker('id1', False)
    assert result == "{% modelName| capitalize %} status does not match verification status"
