const Koa = require('koa');
const app = new Koa();

const index = require('./routes/index');

app.use(index.routes());

const PORT = 3000 || process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

module.exports = server;
