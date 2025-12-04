const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('posts').del()
  await knex('pets').del()
  await knex('comments').del()
  await knex('events').del()
  await knex('event_attendees').del()
  await User.create('cool_cat', 'password1');
  await User.create('l33t-guy', 'password1');
};