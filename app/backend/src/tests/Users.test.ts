import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';
import { token, UserMock } from './mocks/User.mock';
import JWT from '../middlewares/jwtAuthentication'

const jwt = new JWT()

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  let chaiHttpResponse: Response;

  describe('Login', () => {

    describe('Campos inválidos', () => {
      it('campos precisam estar todos preenchidos', () => {
        chai.request(app).post('/login').send({password: '0123456'}).end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.deep.equal({message: 'All fields must be filled'})
        })
      })

      it('campos precisam estar corretos', () => {
        chai.request(app).post('/login').send({email: 'batata@frita.com', password: 'secret_batata'}).end((_err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.deep.equal({message: 'Incorrect email or password'})
        })
      })
    });

    describe('Campos válidos', () => {
      beforeEach(() => {
        sinon.stub(Users, 'findOne')
        .resolves(UserMock as any)
      });

      afterEach(() => {
        (Users.findOne as sinon.SinonStub).restore()
      });

      it('login recebe o token corretamente', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'secret_admin'})

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.property('token')
      });

      it('retorna a role corretamente', async () => {
        chaiHttpResponse = await chai.request(app).get('/login/validate').set({'Authorization': token})

        expect(chaiHttpResponse.body).to.deep.equal({ role: 'admin' });

      })
    });
  });
});
