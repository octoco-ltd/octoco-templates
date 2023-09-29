import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class HelloWorld extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        /*
            The NodejsFunction construct assumes the following by default:

            -   Your function handler is called handler.

            -   The .ts file that contains the function code (hello-world.function.ts) is in the same directory as the .ts file that contains the construct (hello-world.ts). The construct uses the construct's ID ("hello-world") and the name of the Lambda handler file ("function") to find the function code. For example, if your function code is in a file called hello-world.my-function.ts, the hello-world.ts file must reference the function code like this:
                const helloFunction = new NodejsFunction(this, 'my-function');
         */
        const helloFunction = new NodejsFunction(this, 'function');
        new LambdaRestApi(this, 'apigw', {
            handler: helloFunction,
        });
    }
}