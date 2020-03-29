import chai from 'chai';
import request from 'request';
const expect = chai.expect;

describe("Checking No-Auth Endpoints", () => {

  it('Check Status Page', done => {
    request('http://localhost:4000/status', (error, res, body) => {
      if (res != undefined) {
        expect(res.statusCode).to.equal(200);
        done();
      } else {
        done(new Error("No response for site status"));
      }
    });
  });
});