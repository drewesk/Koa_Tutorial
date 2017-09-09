process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../index');
const knex = require('../connection');

describe('routes : movies', () => {

  beforeEach(() => {
    return knex.migrate.rollback().then(() => {
      return knex.migrate.latest();
    }).then(() => {
      return knex.seed.run();
    })
  })

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/movies', () => {
    it('should return all movies', (done) => {
      chai.request(server)
        .get('/api/movies')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          done();
      });
    });
  });


});
