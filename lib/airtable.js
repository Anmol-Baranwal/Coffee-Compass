var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_WEB_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Projects");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecords };
