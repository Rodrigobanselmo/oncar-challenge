import { Car } from '.prisma/client';
export class CarEntity implements Car {
  id: number;
  plate: string;
  color: string;
  price: string;
  year: string;
  kilometers: number;
  fuel: string;
  desc: string;
  updatedAt: Date;
  created_at: Date;
  modelId: number;

  constructor(partial: Partial<CarEntity>) {
    Object.assign(this, partial);
  }
}
