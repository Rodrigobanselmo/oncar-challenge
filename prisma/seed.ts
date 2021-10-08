// npx prisma migrate dev --name init
// npx prisma studio
import { PrismaClient } from '@prisma/client';
import * as faker from 'faker/locale/pt_BR';

import { FakerBrand } from '../test/fake/brand.fake';
import { FakerCar } from '../test/fake/car.fake';
import { FakerModel } from '../test/fake/model.fake';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const brand = new FakerBrand();
    await prisma.brand.create({ data: brand });
    for (let i = 0; i < 10; i++) {
      const model = new FakerModel(brand.name);
      await prisma.model.create({ data: model });
      for (let i = 0; i < 10; i++) {
        const car = new FakerCar({
          brandName: brand.name,
          modelName: model.name,
        });
        await prisma.car.create({
          data: { created_at: faker.date.recent(), ...car },
        });
      }
    }
  }
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
