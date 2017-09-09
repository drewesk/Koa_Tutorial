const Koa = require('koa');

const app = new Koa();
const PORT = 3000 || process.env.PORT;

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

const server = app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

module.exports = server;
