/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpAdapterHost } from '@nestjs/core';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BrandModule } from '../../src/modules/brandCar/brand.module';
import request from 'supertest';
import { FakerBrand } from '../fake/brand.fake';

import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaDbExceptionFilter } from '../../src/shared/filters/prisma-db-exception.filter';
import { ModelsModule } from '../../src/modules/modelCar/models.module';
import { CarsModule } from '../../src/modules/cars/cars.module';
import { FakerCar } from '../fake/car.fake';
import { FakerModel } from '../fake/model.fake';

describe('[Feature] Cars - /cars', () => {
  let app: INestApplication;
  const brand = new FakerBrand();
  const model = new FakerModel();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
        PrismaModule,
        BrandModule,
        ModelsModule,
        CarsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(new PrismaDbExceptionFilter(httpAdapter));

    app.enableCors({ exposedHeaders: 'x-total-count' });
    await app.init();
  });

  describe('Create [POST /]', () => {
    it('should create car with existent model and brand', async () => {
      const car = new FakerCar({
        brandName: brand.name,
        modelName: model.name,
      });
      return request(app.getHttpServer())
        .post('/cars')
        .send(car)
        .expect(HttpStatus.CREATED);
    });

    it('should create car, model and brand', async () => {
      const car = new FakerCar();
      await request(app.getHttpServer())
        .post('/cars')
        .send(car)
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .get('/brand/' + car.brandName)
        .expect(HttpStatus.OK);
    });

    it('should not create car with same plate', async () => {
      const car = new FakerCar();
      await request(app.getHttpServer())
        .post('/cars')
        .send(car)
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .post('/cars')
        .send(car)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Get One Car [GET /:id]', () => {
    it('should return one Car', async () => {
      const car: any = await request(app.getHttpServer())
        .post('/cars')
        .send(new FakerCar())
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .get('/cars/' + car.body.id)
        .expect(HttpStatus.OK);
    });
    it('should not return a Car if does not exist', async () => {
      return request(app.getHttpServer())
        .get('/cars/' + '12131254123')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('Get All Cars [GET /]', () => {
    it('should return 1 car with limit and filters', async () => {
      const car = new FakerCar();
      await request(app.getHttpServer())
        .post('/cars')
        .send(new FakerCar())
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .post('/cars')
        .send(car)
        .expect(HttpStatus.CREATED);

      const data: any = await request(app.getHttpServer())
        .get('/cars')
        .query({ limit: '1' })
        .expect(HttpStatus.OK);

      expect(data.body.length).toBe(1);

      const data1: any = await request(app.getHttpServer())
        .get('/cars')
        .query({ brandName: car.brandName })
        .expect(HttpStatus.OK);

      expect(data1.body.length).toBe(1);
    });
  });

  // describe('Get All Brands [GET /]', () => {
  //   it('should return all brands', async () => {
  //     const brand = new FakerBrand();
  //     await request(app.getHttpServer())
  //       .post('/brand')
  //       .send(brand)
  //       .expect(HttpStatus.CREATED);
  //     return request(app.getHttpServer())
  //       .get('/brand/' + brand.name)
  //       .expect(HttpStatus.OK);
  //   });
  // });

  afterAll(async () => {
    await app.close();
  });
});
