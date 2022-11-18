import { GoogleSpreadsheet } from 'google-spreadsheet';

import { SHEET_ID, SHEET_TITLE } from '$env/static/private';
import secrets from './arnolds-sheets-944ad35df3c7.json';

// import { google } from 'googleapis';

const headers = [
	'Facility_Name',
	'Trn_Id',
	'Trn_Date',
	'Trn_Product_Name',
	'Master_List_Product_Name',
	'Price_Per_Product_UGX',
	'Approval_Status_Name',
	'Recognized',
	'Month'
];

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const sheetData: any[] = [];

	try {
		const data: any[] = [];

		const doc = new GoogleSpreadsheet(SHEET_ID);
		await doc.useServiceAccountAuth(secrets);

		await doc.loadInfo();

		const sheet = doc.sheetsByTitle[SHEET_TITLE];
		console.log(sheet);

		const rows = await sheet.getRows();

		rows.forEach(row => {
			data.push(headers.map((header) => {
				return row[header];
			}))
		})

		return new Response(
			JSON.stringify({
				status: '200',
				headers,
				data
			})
		);
	} catch (e) {
		return new Response(JSON.stringify({ error: e, sheetData }));
	}
}
