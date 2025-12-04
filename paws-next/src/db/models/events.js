const knex = require('../knex');

class Event{
  constructor({ id, img_url, description, start_time, end_time, date, img_url,privacy}) {
    this.id = id;
    this.img_url = img_url;
    this.description = description;
    this.start_time = start_time;
    this.end_time = end_time;
    this.date = date;
    this.img_url = img_url;
    this.privacy = privacy;
  }

static async list() {
    try {
      const query = 'SELECT * FROM events ORDER BY events.created_at DESC';
      const { rows } = await knex.raw(query);
      return rows.map((events) => new Event(events));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM events WHERE id = ?';
      const { rows: [event] } = await knex.raw(query, [id]);
      return event ? new Event(event) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(id, img_url, description, start_time, end_time, date, img_url,privacy) {
    try {
      const query = `INSERT INTO events (description, start_time, end_time, date, img_url,privacy)
        VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [event] } = await knex.raw(query, [description, start_time, end_time, date, img_url,privacy]);
      return new Event(event);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  update = async (caption) => { 
    try {
      const [updatedEvent] = await knex('events')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedEvent ? new Event(updatedEvent) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  static async delete(id) {
    try{
      await knex.raw(`DELETE FROM posts WHERE event_id = ?`,[ id ])
      await knex.raw(`DELETE FROM event_attendees WHERE event_id = ?`,[ id ])
      const deleted = await knex.raw(`DELETE FROM events WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = Event;
