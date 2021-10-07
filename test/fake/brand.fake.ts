import * as faker from 'faker/locale/pt_BR';
import { CreateBrandDto } from '../../src/modules/brandCar/dto/create-brand.dto';

export class FakerBrand implements CreateBrandDto {
  readonly name = faker.vehicle.manufacturer() + ' ' + faker.datatype.uuid();
}
