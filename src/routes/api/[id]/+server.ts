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

		const response1 :any = await collection1.findOne({_id :new ObjectId(id)});
		
		const Facility_Name = response1.facility;
		
		const response2 = await collection2.find({"FACILITY_NAME": Facility_Name}).toArray();
		//const response3 = await collection3.find({"Facility Name_1": Facility_Name}).toArray();
		


		return json({
			consumption : response2,
			payments : response1
		});
	} catch (e) {
		return json({ error: e });
	}

	return json({ msg: 'nil' });
};
