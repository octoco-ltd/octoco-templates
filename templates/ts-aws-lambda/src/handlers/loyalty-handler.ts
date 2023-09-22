import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {ExampleService} from "../services/example-service";
import {MongoExampleRepository} from "../repositories/mongo/mongo-example-repository";
import {HttpExampleClient} from "../clients/http/http-example-client";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	/*
	The entry point for the lambda function
	 */
	try {
		// Instantiate actual implementations of repos and clients and pass to service layer
		const exampleRepo = new MongoExampleRepository()
		const exampleClient = new HttpExampleClient()

		const exampleService = new ExampleService(exampleRepo, exampleClient)
	return {
		statusCode: 200,
		body: `Hallo world`,
	};
	} catch (error: any) {
		console.error(error)
		return {
			statusCode: 200,
			body: JSON.stringify(error),
		};
	}
};
