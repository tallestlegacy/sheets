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
		const collection = await getCollection('clients');
		const update_res = await collection.insertMany(data);

		return json({ update_res });
	} catch (e) {
		return json({ error: e });
	}
};
