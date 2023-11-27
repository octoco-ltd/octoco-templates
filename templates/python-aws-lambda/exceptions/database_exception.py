"""
The standard database exception thrown by the application
"""

class DatabaseException(Exception):
    """
    The database business exception thrown by the application.
    This exists to not raise generic exceptions
    """
    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.__message = message

    def __str__(self) -> str:
        return self.__message
