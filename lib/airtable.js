var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_WEB_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Projects");

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
    const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          }) 
          .firstPage();

          return getMinifiedRecords(findCoffeeStoreRecords);

        return [];
}
 
export { table, getMinifiedRecords, findRecordByFilter };
