# Integration Tests

Integration tests differ from unit tests in that it does not test a specific piece of code but  rather differnet parts working together. We typically test all of the functions in each services layer. We pass the in-memory versions of our repositories and clients to this layerand have to create mock entries in the in-memory db for each edge case.