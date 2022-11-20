import { Db, MongoClient } from 'mongodb';

//let uri = process.env.DB_URI;
const uri = 'mongodb+srv://shelly:aphroditeviking@cluster0.afcsznm.mongodb.net/test';

const dbName = 'nifty_database';

/**
 * @type {MongoClient | null}
 */
let cachedClient: MongoClient | null = null;
/**
 * @type {import("mongodb").Db | null}
 */
let cachedDb: Db | null = null;

if (!uri) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
	throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri, {
		//useNewUrlParser: true,
		//useUnifiedTopology: true
	});

	const db = await client.db(dbName);

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}

export const getCollection = async (/** @type {any} */ collectionName: any) => {
	const dbConnection = await connectToDatabase();
	const db = dbConnection.db;
	const collection = db.collection(collectionName || '');
	return collection;
};