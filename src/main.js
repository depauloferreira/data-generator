import fs from "node:fs";
import path from "node:path";
import readline from "node:readline"
import stream from "node:stream";
import { person } from "./generators/person.js";
import { company } from "./generators/company.js";
import { producer } from "./producer/producer.js"
import { lead } from "./generators/lead.js";
import { getStorage } from "./storage/file.js"
import { transformer } from "./transformers/csv.js";
import { line } from "./readers/line.js";


const DATA_DIR = path.resolve(`${import.meta.dirname}${path.sep}..${path.sep}data`)
const ORGANIZATION_FILE = `${DATA_DIR}${path.sep}organization.csv`;
const LEAD_FILE = `${DATA_DIR}${path.sep}lead.csv`;
const ONE_HUNDERED = 100;
const ONE_THOUSEND = 1000;
const TEN_THOUSEND = 10000;
const ONE_HUNDRED_THOUSAND = 100000;

const generateOrganizations = new Promise((resolve, reject) => {
    const organizationProducer = producer(company, 10);
    const organizationStorage = getStorage(ORGANIZATION_FILE);
    const csvTransformer = transformer();

    organizationProducer.pipe(csvTransformer).pipe(organizationStorage);
    organizationStorage.on('finish', resolve)
    organizationStorage.on('error', reject)
});

const generateLeads = new Promise((resolve, reject) => {
    const lineReader = line(ORGANIZATION_FILE);
    const csvTransformer = transformer();

    const organizationToLeadsTransformer = new stream.Transform({
        transform: (line, _, callback) => {
            const [organizationId] = line.toString().split(';');
            Array(1).fill({}).map(() => ({ ...lead(), organizationId })).forEach((l) => {
                callback(null, JSON.stringify(l))
            });
        }
    })

    const storage = getStorage(LEAD_FILE);

    lineReader.pipe(organizationToLeadsTransformer).pipe(csvTransformer).pipe(storage);

    storage.on('close', resolve);
    storage.on('error', reject);
});

await generateLeads;
