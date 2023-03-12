import { findRecordByFilter } from "@/lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;

      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          res.json({ message: "Coffee store id doesn't exist", id });
        }
        
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
      //   res.json({ message: "works", id });
    } catch (err) {
      res.status(500);
      res.json({ message: "error in upvoting", err });
    }
  }
};

export default favouriteCoffeeStoreById;
