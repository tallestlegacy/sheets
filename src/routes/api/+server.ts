/* import { GoogleSpreadsheet } from 'google-spreadsheet';

import { SHEET_ID, SHEET_TITLE } from '$env/static/private';
import secrets from './arnolds-sheets-944ad35df3c7.json';

// import { google } from 'googleapis';



const headers = "Facility_Name	Trn_Id	Trn_Date	Trn_Product_Name	PRODUCT_NAME	Standard Cost Prices	APPROVAL_STATUS_NAME	Recognized	Month	Facility_Name_Filter".split("\t")

/** @type {import('./$types').RequestHandler} */
/*
export async function GET() {
	const sheetData: any[] = [];

	try {
		const data: any[] = [];

		const doc = new GoogleSpreadsheet(SHEET_ID);
		await doc.useServiceAccountAuth(secrets);

		await doc.loadInfo();

	/*	
		const sheet = doc.sheetsByTitle[SHEET_TITLE];
		console.log(sheet);

		const rows = await sheet.getRows();

		rows.forEach(row => {
			data.push(headers.map((header) => {
				return row[header];
			}))
		})
	*/
/*
		return new Response(
			JSON.stringify({
				status: '200',
				headers,
				data,
				SHEET_ID
			})
		);
	} catch (e) {
		sheetData.push(SHEET_ID)
		sheetData.push(SHEET_TITLE)
		return new Response(JSON.stringify({ error: e, sheetData }));
	}
}
 */