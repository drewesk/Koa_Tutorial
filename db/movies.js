const knex = require('../connection');

module.exports = {
  getAll: () => {
    return knex('movies'); //same as chaining .select('*')
  },

  get: (id) => {
    return knex('movies').where('id', id).first();
  },

  create: (movie) => {
    return knex('movies').insert(movie).returning('*');
  },

  update: (movie_id, movie) => {
    return knex('movies').update(movie).where('id', movie_id).returning('*');
  },

  delete: (movie_id) => {
    return knex('movies').where('id', movie_id).del().where('id', movie_id).returning('*');
  }
}
