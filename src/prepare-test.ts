import { getDynamoDBClient, readConfiguration } from './lib';

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
})();
