import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getDocumentClient, readConfiguration } from './lib';

(async () => {
	const config = readConfiguration();
	const client = getDocumentClient(config);
})();

async function conditionalIncreaseThresholdByUser({
	client, userId
}: {
	client: DocumentClient,
	userId: number
}) {

}

function makeConcurrencyTestByUser({
	client, userId, concurrency
}: {
	client: DocumentClient,
	userId: number,
	concurrency: number
}): Promise<void>[] {

	return [];
}
