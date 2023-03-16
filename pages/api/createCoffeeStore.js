import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";
// or: import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable";

// console.log(table);

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgURL, voting } = req.body;

    try {
      // finding record
      if (id) {
        // no sense of finding a coffee store without id

        const records = await findRecordByFilter(id);

        if (records.length !== 0) {

          res.json(records);
        } else {
          // create record
          if (name) {
            const createRecords = await table.create([
              {
                // as long as these fields exists, record will be created by using these variables
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgURL,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
            // res.json({ message: "create a record", records: createRecords });
          } else {
            res.status(400);
            res.json({ message: "ID or Name is missing !!" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "ID is missing !!" });
      }
    } catch (err) {
      console.log("Error creating or finding store", err);
      res.status(500);
      res.json({ message: "Error creating or finding store", err });
    }
  }
};

export default createCoffeeStore;

//Note:  by default every serverless function is a get request
