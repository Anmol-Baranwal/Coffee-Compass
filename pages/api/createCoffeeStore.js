import Airtable from "airtable";
var base = new Airtable({ apiKey: process.env.AIRTABLE_WEB_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Projects");

console.log(table);

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgURL, voting } = req.body;

    try {
      // finding record
      if (id) {
        // no sense of finding a coffee store without id
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
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

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });
            res.json({ message: "create a record", records: createRecords });
          } else {
            res.status(400);
            res.json({ message: "ID or Name is missing !!" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "ID or Name is missing !!" });
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
