exports.up = function(knex, Promise) {

  return knex.schema.createTable('movies', (table) => {

    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('genre').notNullable();
    table.integer('rating').notNullable();
    table.boolean('explicit').notNullable();

  });
};

exports.down = function(knex, Promise) {

  return knex.schema.dropTableIfExists('movies');

};
