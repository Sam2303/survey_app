import { table, minifyRecords } from "./utils/Airtable-survey";

export default async (req, res) => {
    const {Title, Private, Password, Questions, Responses} = req.body
    try{
        const createdRecords = await table.create([{fields : {Title, Private, Password, Questions, Responses}}]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields
        }
        res.status(200);
        res.json(createdRecord);
    }catch (err){
        console.error(err);
        res.status(500);
        res.json({msg: 'Something went wrong'})
    }
};