import { json } from '@sveltejs/kit';
import { getCollection } from '../mongo';

export const GET = async ({ params }: any) => {
	const id = params.id;

	try {
		const collection = await getCollection('consumption-data');

		console.log(`"${id}"`)
		
		const response = await collection.find({Facility_Name: id}).toArray();
		
		console.log(`${response.length} records fetched!!`)

		return json(response);
	} catch (e) {
		return json({ error: e });
	}

	return json({ msg: 'nil' });
};
