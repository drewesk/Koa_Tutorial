const Router = require('koa-router');
const router = new Router();

const routes = {

  index: async (ctx) => {
    ctx.body = {
      message: 'This is the home-page.',
      status: 'success'
    }
  },

  about: async (ctx) => {
    ctx.body = {
      message: 'this is the about-page.',
      status: 'success'
    }
  }
}

router.get('/', routes.index);
router.get('/about', routes.about);

module.exports = router;
