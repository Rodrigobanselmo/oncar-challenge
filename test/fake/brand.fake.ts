import faker from 'faker/locale/pt_BR';

export const fakerBrand = () => {
  return {
    brand: faker.vehicle.manufacturer(),
  };
};
