import {table, getMinifiedRecords} from "@/lib/airtable"


const getCoffeeStoresById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {

        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length != 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
            res.json({ message: `id not found` });
        }
    } else {
      res.status(400);
      res.json({ message: "ID is missing !!" });
    }
  } catch (err) {
    res.status(500);
    res.json({ message: "Error occured", err });
  }
};

export default getCoffeeStoresById;
