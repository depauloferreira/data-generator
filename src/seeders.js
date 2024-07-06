import fs from "node:fs"

import { HWM } from "./constants.js";
import { getCompanyReader } from "./readers.js";
import { generateCompany, getGenerator, getLeadGenerator } from "./generators.js";

export function getCompanySeeder(amount) {
    return new Promise((res, rej) => {
        const companyFileStream = fs.
            createWriteStream('data/company.txt', { flags: 'w' });

        const companyGenerator = getGenerator(generateCompany, amount)

        companyGenerator.pipe(companyFileStream)

        companyFileStream.on('close', res)
        companyFileStream.on('error', rej)
    })
}

export function getLeadSeeder(amount) {
    return new Promise((res, rej) => {
        const leadFileStream = fs.createWriteStream('data/lead.txt', { flags: 'w', highWaterMark: HWM.MID });
        const leadGenerator = getLeadGenerator(amount)
        const companies = getCompanyReader()

        companies.pipe(leadGenerator).pipe(leadFileStream)

        leadFileStream.on('close', res)
        leadFileStream.on('error', rej)
    })
}