import { getCompanySeeder, getLeadSeeder } from "./seeders.js";

await getCompanySeeder(25 * Math.pow(10, 3))
await getLeadSeeder(Math.pow(10, 4))