const Router = require('koa-router');
const router = new Router();

const Movie = require('../db/movies');
const API_URL = '/api/movies';

router.get(API_URL, async (ctx) => {
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

module.exports = router;
