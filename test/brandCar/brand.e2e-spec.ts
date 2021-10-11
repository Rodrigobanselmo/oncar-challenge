import { HttpAdapterHost } from '@nestjs/core';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BrandModule } from '../../src/modules/brandCar/brand.module';
import request from 'supertest';
import { FakerBrand } from '../fake/brand.fake';

import { PrismaModule } from './../../src/prisma/prisma.module';
import { PrismaDbExceptionFilter } from './../../src/shared/filters/prisma-db-exception.filter';

describe('[Feature] Brands - /brand', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
        PrismaModule,
        BrandModule,
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
    it('should create brand', async () => {
      const brand = new FakerBrand();
      return request(app.getHttpServer())
        .post('/brand')
        .send(brand)
        .expect(HttpStatus.CREATED);
    });
    it('should not create brand with same name', async () => {
      const brand = new FakerBrand();
      await request(app.getHttpServer())
        .post('/brand')
        .send(brand)
        .expect(HttpStatus.CREATED);
      return request(app.getHttpServer())
        .post('/brand')
        .send(brand)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Get One Brand [GET /:id]', () => {
    it('should return one brands', async () => {
      const brand = new FakerBrand();
      await request(app.getHttpServer())
        .post('/brand')
        .send(brand)
        .expect(HttpStatus.CREATED);
      return request(app.getHttpServer())
        .get('/brand/' + brand.name)
        .expect(HttpStatus.OK);
    });
  });

  describe('Get All Brands [GET /]', () => {
    it('should return all brands', async () => {
      const brand = new FakerBrand();
      await request(app.getHttpServer())
        .post('/brand')
        .send(brand)
        .expect(HttpStatus.CREATED);
      return request(app.getHttpServer())
        .get('/brand/' + brand.name)
        .expect(HttpStatus.OK);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
