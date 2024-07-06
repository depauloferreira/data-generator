import { seedOrganization } from "./seeder/seed-organization.js"
import { seedLead } from "./seeder/seed-lead.js"
import { readLine } from "./utils/read-line.js";
import { Stream } from "node:stream";
import fs from 'node:fs'

const ONE_HUNDERED = 100;
const ONE_THOUSEND = 1000;
const TEN_THOUSEND = 10000;
const ONE_HUNDRED_THOUSAND = 100000;

await seedOrganization(ONE_HUNDRED_THOUSAND * ONE_HUNDRED_THOUSAND)
// await seedLead(ONE_HUNDRED_THOUSAND * ONE_HUNDRED_THOUSAND)

// const ORGANIZATION_FILE = `${DATA_DIR}${path.sep}organization.csv`;
// const LEAD_FILE = `${DATA_DIR}${path.sep}lead.csv`;

// const storage = fileStorage(LEAD_FILE);
// const companies = readLine(ORGANIZATION_FILE)
// // const storage = fileStorage(LEAD_FILE)
// // const transformer = csvTransformer();
// // let shouldWriteHeader = true;
// // const transform = new Transform({
// //     transform: function (data, _, cb) {
// //         this.push(data)
// //         cb()
// //     } 
// // })
// const rs = fs.createReadStream(ORGANIZATION_FILE)
// const ws = fs.createWriteStream(LEAD_FILE)
// rs.pipe(ws)