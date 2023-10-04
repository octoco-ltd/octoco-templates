"""
AWS Lambda function entry point
"""
import json

from services.example_service import ExampleService
from repositories.mongo.mongo_example_repository import MongoExampleRepository


def handler(event, context):
    """
    Entry point for the lambda function  We instantiate the actual implementations
    of our clients and repositories and pass it to the relevant service layer
    """

    example_repo = MongoExampleRepository()
    example_service = ExampleService(example_repo)

    all_examples = example_service.get_all_examples()

    return {
        "statusCode": 200,
        "body": json.dumps(all_examples)
    }


handler(None, None)
