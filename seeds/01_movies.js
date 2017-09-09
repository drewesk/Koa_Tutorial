exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE movies RESTART IDENTITY CASCADE;')

    .then(() => {
      return knex('movies').insert([
        {
          name: 'A Land Before the Next Time Afterward, A Sequel',
          genre: 'Fantasy',
          rating: 2,
          explicit: false
        },
        {
          name: 'Purrasic Park',
          genre: 'Science Kitten',
          rating: 9,
          explicit: true
        },
        {
          name: 'Fifty Shades of Poultry',
          genre: 'Romance',
          rating: 5,
          explicit: true
        }
      ]);
    });
};
