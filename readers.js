import fs from "node:fs"
import readline from "readline";
import { Stream } from "node:stream";

import { HWM } from "./constants.js";

const companiesFileStream = fs.createReadStream("./data/company.txt");

export function getCompanyReader() {
    const lr = readline.Interface({ input: companiesFileStream, crlfDelay: Infinity });

    const companyReader = new Stream.Readable({
        highWaterMark: HWM.MIN,
        read: function () {
            lr.resume()
        }
    })

    companyReader.on('pause', () => lr.pause())

    companyReader.on('resume', () => lr.resume())

    lr.on('line', (line) => {
        companyReader.push(line)
    })

    lr.on('end', () => {
        companyReader.push(null)
    })

    return companyReader
}
