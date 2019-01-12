import chai from 'chai';
// import request from 'request';
import chaiHttp from 'chai-http';

import app from '../src/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Checks page routes', () => {
  describe('checks landing url. GET /', () => {
    it('landing page', done => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => expect(res.body).to.be.equal('Welcome to Todos'));
      done();
    });
    it('checks return status is 200', done => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
