const Router = require('koa-router');
const router = new Router();

const Movie = require('../db/movies');
const API_URL = '/api/movies';

router.get(API_URL, async(ctx) => {
  try {
    const movies = await Movie.getAll();
    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (err) {
    console.log(err)
  }
});

router.get(`${API_URL}/:id`, async(ctx) => {
  try {
    const movie = await Movie.get(ctx.params.id);
    if (movie) {
      ctx.body = {
        status: 'success',
        data: movie
    };
  } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie doesn\'t exist.'
      }
  }
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
