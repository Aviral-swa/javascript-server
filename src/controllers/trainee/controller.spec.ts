import configuration from '../../config/configuration';
import Server from '../../Server';
import Database from '../../libs/database';
import * as supertest from 'supertest';
import constants from './constants';

const server = new Server(configuration);
const app = server.bootstrap();
const request = supertest(app);
let authToken: string;

beforeAll(async () => {
    const { port, mongo_url} = configuration;
      Database.open(mongo_url)
          .then((res) => {
              app.listen(port, err => {
                  if (err) {
                      console.log(`Error: app failed  ${err}`);
                  }
                  console.log(`app is running on port ${port}`);
              });
          })
          .catch((err) => {
          console.log(err);
          });
    return request
            .post('/api/user/login')
            .send({
                email: 'sadmin@successive.tech',
                password: 'Qwerty@1234'
            })
            .then((res) => {
                authToken = res.body.data.generated_token;
            });

  });

  afterAll(() => {
    Database.disconnect();
});

describe('Trainee Get API', () => {
    it('should return all trainees', async () => {
        return request
            .get('/api/trainee')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.successMessages.SUCCESSFULLY_FETCHED);
            });
    });
    it('should return the trainee searched', async () => {
        return request
            .get('/api/trainee')
            .set('Authorization', authToken)
            .query(constants.getQueryOptions)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.data.traineesList.length).toBe(1);
            });
    });
    it('should return not found', async () => {
        return request
            .get('/api/trainee')
            .set('Authorization', authToken)
            .query(constants.getOptions)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.NO_TRAINEES);
            });
    });
    it('should return bad request', async () => {
        return request
            .get('/api/trainee')
            .set('Authorization', authToken)
            .query(constants.badGetOptions)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.error).toBe(constants.errorMessages.BAD_RESQUEST);
            });
    });
});

describe('Trainee Post Api', () => {
    it('should create a trainee', async () => {
        return request
            .post('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.createTestData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.status).toBe(constants.successMessages.SUCCESS_STATUS);
            });
    });

    it('should respond with duplicate request', async () => {
        return request
            .post('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.createTestData)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.DUPLICATE_REQUEST_MESSAGE);
            });
    });

    it('should respond with bad request', async () => {
        return request
            .post('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.badTestData)
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

describe('Trainee Put Api', () => {
    it('should return invalid id', async () => {
        return request
            .put('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.wrongUpdateTestData)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.NOT_FOUND);
            });
    });

    it('should update a trainee', async () => {
        return request
            .put('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.updateTestData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.status).toBe(constants.successMessages.SUCCESS_STATUS);
            });
    });
    it('should update password', async () => {
        return request
            .put('/api/trainee')
            .set('Authorization', authToken)
            .send(constants.passUpdateTestData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.status).toBe(constants.successMessages.SUCCESS_STATUS);
            });
    });
});

describe('Trainee Delete Api', () => {
    it('should return invalid id', async () => {
        return request
            .delete('/api/trainee/83297827')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.NOT_FOUND);
            });
    });

    it('should delete a trainee', async () => {
        return request
            .delete('/api/trainee/60670b334fb6c437ec99f02b')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(400);
    });
});