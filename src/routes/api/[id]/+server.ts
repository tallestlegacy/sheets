import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getCollection } from '../mongo';

export const GET = async ({ params }: any) => {
	const id = params.id;

	try {
		const collection1 = await getCollection('clients');
		const collection2 = await getCollection('consumption-data');
		const collection3 = await getCollection('payments');

		
		console.log(id)

		const response1 :any = await collection1.find({_id :new ObjectId(id)}).toArray();
		
		const Facility_Name = response1[0].name_1;
		
		const response2 = await collection2.find({"Facility_Name": Facility_Name}).toArray();
		const response3 = await collection3.find({"Facility Name_1": Facility_Name}).toArray();
		


		return json({
			consumption : response2,
			payments : response3
		});
	} catch (e) {
		return json({ error: e });
	}

	return json({ msg: 'nil' });
};
