import { json } from '@sveltejs/kit';
import { getCollection } from '../../mongo';

export const POST = async ({ request }: any) => {
	const data = await request.json();

	if (data.length == 0)
		return new Response(
			`{
            "msg" : "Nothing done"
        }`
		);

	try {
		console.log(data.length);

		const collection = await getCollection('consumption-data');

		const delete_res = await collection.deleteMany({});
		console.log(delete_res);

		const update_res = await collection.insertMany(data);
		console.log(update_res);

		return json({ delete_res, update_res });
	} catch (e) {
		return json({ error: e });
	}
};
