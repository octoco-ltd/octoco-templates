"""
The standard business exception thrown by the application
"""

class BusinessException(Exception):
    """
    The standard business exception thrown by the application.
    This exists to not raise generic exceptions
    """
    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.__message = message

    def __str__(self) -> str:
        return self.__message
