process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../index');
const knex = require('../connection');

describe('routes: movies', () => {

  beforeEach(() => {
    return knex.migrate.rollback().then(() => {
      return knex.migrate.latest();
    }).then(() => {
      return knex.seed.run();
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/movies', () => {
    it('should return all movies', (done) => {
      chai.request(server).get('/api/movies').end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(3);
        res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
        done();
      });
    });

    it('should throw an error if the movie doesn\'t exist', (done) => {
      chai.request(server).get('/api/movies/12345').end((err, res) => {
        should.exist(err);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That movie doesn\'t exist.');
        done();
      });
    });
  });

  describe('POST /api/movies', () => {
    it('should return the created movie', (done) => {
      chai.request(server).post('/api/movies').send({name: 'Titanic', genre: 'Drama', rating: '10', explicit: true}).end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
        done();
      });
    });

    it('should throw a new error if the movie is invalid', (done) => {
      chai.request(server).post('/api/movies').send({name: 'Titanic'}).end((err, res) => {
        should.exist(err);
        res.status.should.eql(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/movies', () => {
    it('should return the updated movie', (done) => {
      knex('movies').select('*').then((movie) => {
        const Movie = movie[0];
        chai.request(server).put(`/api/movies/${Movie.id}`).send({rating: 9}).end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          const movieRating = res.body.data[0];
          movieRating.rating.should.not.eql(Movie.rating);
          done();
        });
      });
    });

    it('Should throw an error if the movie doesn\'t exist', (done) => {
      chai.request(server).put('/api/movies/123456789').send({rating: 9}).end((err, res) => {
        should.exist(err);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That movie doesn\'t exist.');
        done();
      });
    });
  });

  describe('DELETE /api/movies/:id', () => {
    it('should return a deleted movie', (done) => {
      knex('movies').then((movies) => {
        const Movie = movies[0];
        const tempLength = movies.length;
        chai.request(server).delete(`/api/movies/${Movie.id}`).end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          knex('movies').then((movies) => {
            movies.length.should.eql(tempLength - 1);
            done();
          });
        });
      });
    });

    // it('should throw an error if a movie doesn\'t exist', (done) => {
    //   chai.request(server)
    //     .delete('api')
    // })
  });

});
