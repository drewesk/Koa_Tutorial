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
    ctx.status = 404;
    ctx.body ={
      status: 'error',
      message: err.message || 'Oops, Something we wrong...'
    };  }
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
    ctx.status = 404;
    ctx.body ={
      status: 'error',
      message: err.message || 'Oops, Something we wrong...'
    };
  }
});

router.post(`${API_URL}`, async (ctx) => {
  try {
    const movie = await Movie.create(ctx.request.body);
    if (movie) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie was not created.'
      };
    }
  } catch (err) {
    ctx.status = 404;
    ctx.body ={
      status: 'error',
      message: err.message || 'Oops, something we wrong...'
    };
  }
});

router.put(`${API_URL}/:id`, async (ctx) => {
  try {
    const movie = await Movie.update(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie doesn\'t exist.'
      };
    }
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: err.message || 'Oops, something went wrong...'
    }
  }
});



module.exports = router;
