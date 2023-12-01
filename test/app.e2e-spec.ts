import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스트 환경도 메인 화면과 동일하게 적용해야 한다.
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  // controller 마다 describe 섹션 나누기
  describe('/', () => {
    it('GET Home', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('MY Nest API homepage');
    });
  });

  describe('/movies', () => {
    it('GET All Movies', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: '극장판 파워 디지몬',
          year: 2023,
          genres: ['애니메이션', '판타지'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: '극장판 파워 디지몬2',
          year: 2024,
          genres: ['애니메이션', '판타지'],
          other: 'thing',
        })
        .expect(400);
    });

    it('PATCH Movie id 1', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: '아따맘마' })
        .expect(200);
    });

    it('DELETE Movie id 1', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('GET Movie id 1', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(404);
    });
  });
});
