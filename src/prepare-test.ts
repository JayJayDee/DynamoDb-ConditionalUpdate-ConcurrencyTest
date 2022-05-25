import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getDynamoDBClient, getDocumentClient, readConfiguration } from './lib';

(async () => {
	const config = readConfiguration();
	const client = getDynamoDBClient(config);
	const { tableName } = config;

	const response = await client.createTable({
		TableName: tableName,
		BillingMode: 'PAY_PER_REQUEST',
		KeySchema: [{
			AttributeName: 'user_id',
			KeyType: 'HASH'
		}],
		AttributeDefinitions: [{
			AttributeName: 'user_id',
			AttributeType: 'N'
		}]
	}).promise();
	console.log(response);

	await waitLittle(10);

	const documentClient = getDocumentClient(config);
	for (let i = 1; i <= 5; i++) {
		await makeTestUser({ documentClient, tableName, userId: i });
		console.log(`user: ${i} created`);
	}
})();

function waitLittle(seconds: number) {
	return new Promise(
		resolve => setTimeout(resolve, seconds * 1000)
	);
}

async function makeTestUser({ documentClient, tableName, userId }: {
	documentClient: DocumentClient,
	tableName: string,
	userId: number
}) {
	await documentClient.put({
		TableName: tableName,
		Item: {
			user_id: userId,
			star_count: 0
		}
	}).promise();
}
