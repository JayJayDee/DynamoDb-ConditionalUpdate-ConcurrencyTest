import { Configuration, readConfiguration } from './configurator';
import { getDocumentClient, getDynamoDBClient } from './client-factory';

export {
	readConfiguration, Configuration,
	getDocumentClient, getDynamoDBClient
};
