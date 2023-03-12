import { table, findRecordByFilter, getMinifiedRecords } from "@/lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;

      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];

            const calculateVoting= parseInt(record.voting) + parseInt(1);

            // update voting in airtable
            const updateRecord= await table.update([
                {
                    id: record.recordId,
                    fields: {
                        voting: calculateVoting
                    },
                },
            ]);
            if(updateRecord){
                const minifiedRecord= getMinifiedRecords(updateRecord);
                res.json(minifiedRecord);
            }
        } else {
          res.json({ message: "Coffee store id doesn't exist", id });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      res.status(500);
      res.json({ message: "error in upvoting", err });
    }
  }
};

export default favouriteCoffeeStoreById;
