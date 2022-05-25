import 'dotenv/config';

type Configuration = {
	tableName: string;
	accessKeyId: string;
	secretAccessKey: string;
};

function readMandatory(key: string): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(`environment variable: ${key} is mandatory`);
	}
	return value;
}

function readConfiguration(): Configuration {
	const tableName = readMandatory('DYNAMODB_TABLE_NAME');
	const accessKeyId = readMandatory('AWS_ACCESS_KEY_ID');
	const secretAccessKey = readMandatory('AWS_SECRET_ACCESS_KEY');
	return {
		tableName, accessKeyId, secretAccessKey
	};
}

export {
	Configuration,
	readConfiguration
};
