import { Credentials, DynamoDB } from 'aws-sdk';

import { Configuration } from './configurator';

function getDocumentClient({ accessKeyId, secretAccessKey }: Configuration) {
	const credentials = new Credentials({ accessKeyId, secretAccessKey });
	const documentClient = new DynamoDB.DocumentClient({
		credentials,
		region: 'ap-northeast-2'
	});
	return documentClient;
}

function getDynamoDBClient({ accessKeyId, secretAccessKey }: Configuration) {
	const credentials = new Credentials({ accessKeyId, secretAccessKey });
	const client = new DynamoDB({
		credentials,
		region: 'ap-northeast-2'
	});
	return client;
}

export {
	getDocumentClient,
	getDynamoDBClient
};
