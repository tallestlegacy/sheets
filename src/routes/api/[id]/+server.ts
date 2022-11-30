import { json } from '@sveltejs/kit';
import { getCollection } from '../mongo';

export const GET = async ({ params }: any) => {
	const id = params.id;

	try {
		const collection1 = await getCollection('consumption-data');
		const collection2 = await getCollection('payments');

		console.log(`"${id}"`)
		
		const response1 = await collection1.find({Facility_Name: id}).toArray();
		const response2 = await collection2.find({"Facility Name_1": id}).toArray();
	


		return json({
			consumption : response1,
			payments : response2
		});
	} catch (e) {
		return json({ error: e });
	}

	return json({ msg: 'nil' });
};
