import { json } from "@sveltejs/kit";
import {getCollection} from "../../mongo"


export const GET = async () => {

	try {
		const collection = await getCollection('clients');
		const response = await collection.find().toArray();
		return json(response);
	} catch (e) {
		return json({ error: e });
	}
};
