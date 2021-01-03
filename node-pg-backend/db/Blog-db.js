const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('post')
  },
  getOne(id) {
    return knex('post').where('id', id)
  },
  create(blog){
    return knex('post').insert(blog).returning("*")
  },
  update(id, blog){
    return knex('post').where("id", id).update(blog)
  },
  delete(id){
    return knex('post').where("id", id).del()
  }
}