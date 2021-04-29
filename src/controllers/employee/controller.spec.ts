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

describe('Employee Get API', () => {
    it('should return all employees', async () => {
        return request
            .get('/api/employee')
            .set('Authorization', authToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe(constants.successMessages.SUCCESSFULLY_FETCHED);
            });
    });
});

describe('Employee Post API', () => {
    it('should create a new employee', async () => {
        return request
            .post('/api/employee')
            .set('Authorization', authToken)
            .send({
                name: 'employee 23',
                role: 'tech lead',
                parent: 'employee 11'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
            expect(res.body.data.name).toBe('employee 23');
            });
    });

    it('should respond with Duplicate request', async () => {
        return request
            .post('/api/employee')
            .set('Authorization', authToken)
            .send({
                name: 'employee 23',
                role: 'tech lead',
                parent: 'employee 11'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.error).toBe(constants.errorMessages.DUPLICATE_REQUEST);
            });
    });

    it('should respond with Invalid parent', async () => {
        return request
            .post('/api/employee')
            .set('Authorization', authToken)
            .send({
                name: 'employee 99',
                role: 'tech lead',
                parent: 'employee 199'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
            expect(res.body.error).toBe(constants.errorMessages.INVALID_PARENT);
            });
    });
});