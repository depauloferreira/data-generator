import stream from "node:stream"

import { faker } from '@faker-js/faker';
import { HWM } from "./constants.js";


export function getGenerator(generator, amount) {
    let generated = 0;
    const srcStr = new stream.Readable({
        read: function () {
            if (++generated > amount) {
                this.push(null)
                return;
            }

            const data = JSON.stringify(generator());

            this.push(`${data}\n`);
        }

    });

    return srcStr;
}

export function getLeadGenerator(amount) {

    const traStream = new stream.Transform({
        highWaterMark: HWM.MIN,
        transform: function (data, enconding, cb) {
            const company = JSON.parse(data);
            const srcStr = getGenerator(() => generateLead(company.companyId), amount)

            srcStr.on('data', (data) => {
                this.push(data)
            })

            srcStr.on('end', () => { cb() })
        }
    })

    return traStream;
}

export function generateUser() {
    return {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        location: {
            street: faker.location.street(),
            city: faker.location.city(),
            country: faker.location.country()
        },
        phone: faker.phone.number(),
        username: faker.internet.userName(),
        password: faker.internet.password()
    };
}

export function generateLead(companyId) {
    const now = new Date();
    const lastYear = now;
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    return {
        id: faker.string.uuid(),
        companyId: companyId ?? faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        phone: faker.phone.number(),
        location: {
            street: faker.location.street(),
            city: faker.location.city(),
            country: faker.location.country()
        },
        status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Lost']),
        value: faker.number.int({ min: 1000, max: 1000000 }),
        lastContactAt: faker.date.between({ from: lastYear, to: now })
    };
}

export function generateCompany() {
    return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        location: {
            street: faker.location.street(),
            city: faker.location.city(),
            country: faker.location.country()
        },
        phone: faker.phone.number(),
        email: faker.internet.email(),
        website: faker.internet.url(),
    };
}