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

describe('Permission Get API', () => {
    it('should return all permissions', async () => {
        return request
            .get('/api/permission')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.successMessages.SUCCESSFULLY_FETCHED);
            });
    });
});

describe('Permission Put API', () => {
    it('should update permission', async () => {
        return request
            .put('/api/permission')
            .set('Authorization', authToken)
            .send(constants.testData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.status).toBe(constants.successMessages.SUCCESS_STATUS);
            });
    });

    it('should respond with not found permission', async () => {
        return request
            .put('/api/permission')
            .set('Authorization', authToken)
            .send(constants.wrongTestData)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.NOT_FOUND);
            });
    });

    it('should respond with bad request', async () => {
        return request
            .put('/api/permission')
            .set('Authorization', authToken)
            .send(constants.badTestData)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.error).toBe(constants.errorMessages.BAD_RESQUEST);
            });
    });
});