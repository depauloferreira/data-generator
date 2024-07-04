import { faker } from '@faker-js/faker';

export function company() {
    return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
    };
}