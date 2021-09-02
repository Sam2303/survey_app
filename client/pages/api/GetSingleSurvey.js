import { table, minifyRecords } from "./utils/Airtable-survey";

export default async (req, res) => {
    console.log(req.body);
    try{
        const records = await table.find(req.body.id);
        const minifiedRecords = minifyRecords(records);
        res.status(200);
        res.json(minifiedRecords);
    }catch (err){
        res.status(500);
        res.json({msg: 'Something went wrong'})
        console.log(err);
    }
}