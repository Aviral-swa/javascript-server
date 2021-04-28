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

describe('User Post Api', () => {
    it('should return not registered', async () => {
        return request
            .post('/api/user/login')
            .send(constants.notRegisteredData)
            .expect('Content-Type', /json/)
            .expect(403)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.NOT_REGISTERED);
            });
    });

    it('should respond with incorrect password', async () => {
        return request
            .post('/api/user/login')
            .send(constants.incorrectPassData)
            .expect('Content-Type', /json/)
            .expect(403)
            .then((res) => {
            expect(res.body.message).toBe(constants.errorMessages.INCORRECT_PASSWORD);
            });
    });

    it('should login successfully', async () => {
        return request
            .post('/api/user/login')
            .send(constants.testData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.successMessages.SUCCESSFULLY_CREATED);
            });
    });
});

describe('User Get API', () => {
    it('should return the current loged-in user', async () => {
        return request
            .get('/api/user/me')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.successMessages.SUCCESSFULLY_FETCHED);
            });
    });
});
