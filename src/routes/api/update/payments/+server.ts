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
        const collection = await getCollection("payments");

        const delete_res = await collection.deleteMany({});

        const update_res = await collection.insertMany(data);

        return json({delete_res, update_res});

	} catch(e) {
        return json({error : e});
    }
};
