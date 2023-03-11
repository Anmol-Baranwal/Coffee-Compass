import Airtable from "airtable";
var base = new Airtable({ apiKey: process.env.AIRTABLE_WEB_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Projects");

console.log(table);

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      // finding record
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="1"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length != 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
        // create record
        //   res.json({message: "Creating record"});
        const createRecords = await table.create([
          {
            fields: {
              id: "1",
              name: "My favourite Coffee Store",
              address: "my address",
              neighbourhood: "some neighbourhood",
              voting: 200,
              imgUrl: "http://myimage.com",
            },
          },
        ]);
 
        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json({message: "create a record", records: createRecords});
      }
    } catch (err) {
      console.log("Error finding store", err);
      res.status(500);
      res.json({ message: "Error finding store", err });
    }
  }
};

export default createCoffeeStore;

// by default every serverless function is a get request
