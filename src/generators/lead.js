import { faker } from '@faker-js/faker';
import { person } from '../generators/person.js';

export function lead() {
    const recentDate = faker.date.recent();
    return {
        id: faker.string.uuid(),
        contact: person(),
        createdAt: recentDate,
        lastContactedAt: faker.helpers.arrayElement([faker.date.recent({ min: recentDate }), null]),
        status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Lost', 'Sold', 'Cold']),
    };
}