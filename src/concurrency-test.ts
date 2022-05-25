import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getDocumentClient, readConfiguration } from './lib';

(async () => {
	const config = readConfiguration();
	const client = getDocumentClient(config);

	const { tableName } = config;
	const maxStar = 5;
	const concurrency = 15;

	await Promise.all([
		... makeConcurrencyTestByUser({ client, tableName, userId: 1, maxStar, concurrency }),
		... makeConcurrencyTestByUser({ client, tableName, userId: 2, maxStar, concurrency }),
		... makeConcurrencyTestByUser({ client, tableName, userId: 3, maxStar, concurrency }),
		... makeConcurrencyTestByUser({ client, tableName, userId: 4, maxStar, concurrency }),
		... makeConcurrencyTestByUser({ client, tableName, userId: 5, maxStar, concurrency })
	]);
})();

async function increaseStarCountByUser({
	client, tableName, userId, maxStar
}: {
	client: DocumentClient,
	tableName: string,
	userId: number,
	maxStar: number
}) {
	try {
		await client.update({
			TableName: tableName,
			Key: { user_id: userId },
			UpdateExpression: 'SET star_count = star_count + :given_star',
			ConditionExpression: 'attribute_exists(star_count) AND star_count < :star_max',
			ExpressionAttributeValues: {
				':star_max': maxStar,
				':given_star': 1
			}
		}).promise();
		console.log(`user: ${userId}, star updated`);

	} catch (err) {
		const error: Error = err;
		if (error.message.includes('The conditional request failed')) {
			console.log(`user: ${userId}, condition not satisfied`);
		} else {
			throw err;
		}
	}
}

function makeConcurrencyTestByUser({
	client, tableName, userId, maxStar, concurrency
}: {
	client: DocumentClient,
	tableName: string,
	userId: number,
	maxStar: number,
	concurrency: number
}): Promise<void>[] {
	const promises: Promise<void>[] = [];
	for (let i = 0; i < concurrency; i++) {
		promises.push(increaseStarCountByUser({
			client, tableName, userId, maxStar
		}));
	}
	return promises;
}
