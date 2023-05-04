import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

describe('Appe2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    // await app.listen(3333);

    prismaService = app.get(PrismaService);
    await prismaService.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'sofiya2@gmail.com',
      password: 'AAA2',
    };
    describe('Registration', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/registration')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/registration')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/registration').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/registration')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Login', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('Users', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Sofiya',
          email: 'sofiya2@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Pets', () => {
    // describe('Create pets', () => {});
    // describe('Get pets', () => {});
    // describe('Get pets by id', () => {});
    // describe('Edit pets by id', () => {});
    // describe('Delete pets by id', () => {});
  });
});
