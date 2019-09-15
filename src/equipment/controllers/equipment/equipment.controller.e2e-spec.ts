import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../app.module';

describe('EquipmentController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return Hello on /equipment (GET)', () => {
    return request(app.getHttpServer())
        .get('/equipment')
        .expect('Hello');
  });
});
