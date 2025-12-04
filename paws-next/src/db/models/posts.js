const knex = require('../knex');

class Post{
  constructor({ id, user_id, img_url, caption, username, pet_id,like_count,event_id}) {
    this.id = id;
    this.user_id = user_id;
    this.img_url = img_url;
    this.caption = caption;
    this.username = username;
    this.pet_id =  pet_id;
    this.like_count = like_count;
    this.event_id = event_id;
  }

static async list() {
    try {
      const query = 'SELECT * FROM posts ORDER BY posts.created_at DESC';
      const { rows } = await knex.raw(query);
      return rows.map((posts) => new Post(posts));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM posts WHERE id = ?';
      const { rows: [post] } = await knex.raw(query, [id]);
      return post ? new Post(post) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(user_id, img_url, caption, username, user_id, pet_id,like_count, event_id) {
    try {
      const query = `INSERT INTO posts (user_id, img_url, caption, username, user_id, pet_id, like_count, event_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [post] } = await knex.raw(query, [user_id, img_url, caption,username, user_id, pet_id, like_count, event_id]);
      return new Post(post);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  update = async (caption) => { 
    try {
      const [updatedPost] = await knex('posts')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedPost ? new Post(updatedPost) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  static async delete(id) {
    try{
      await knex.raw(`DELETE FROM comments WHERE post_id = ?`,[ id ])
      const deleted = await knex.raw(`DELETE FROM posts WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = Post;
