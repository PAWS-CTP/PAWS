const knex = require('../knex');

class Comment{
  constructor({ id, user_id, content, post_id}) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.post_id = post_id;
  }

static async list() {
    try {
      const query = 'SELECT * FROM comments ORDER BY comments.created_at DESC';
      const { rows } = await knex.raw(query);
      return rows.map((comments) => new Comment(comments));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM comments WHERE id = ?';
      const { rows: [comment] } = await knex.raw(query, [id]);
      return comment ? new Comment(comment) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(id, img_url, description, start_time, end_time, date, img_url,privacy) {
    try {
      const query = `INSERT INTO comments (description, start_time, end_time, date, img_url,privacy)
        VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [comment] } = await knex.raw(query, [description, start_time, end_time, date, img_url,privacy]);
      return new Comment(comment);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  update = async (caption) => { 
    try {
      const [updatedcomment] = await knex('comments')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedcomment ? new Comment(updatedcomment) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  static async delete(id) {
    try{
      const deleted = await knex.raw(`DELETE FROM comments WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = Comment;
