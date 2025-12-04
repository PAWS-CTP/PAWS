const knex = require('../knex');

class EventAttendee{
  constructor({ event_id, user_id, rsvp_status}) {
    this.id = id;
    this.event_id = event_id;
    this.user_id = user_id;
    this.rsvp_status =rsvp_status;
  }

static async list() {
    try {
      const query = 'SELECT * FROM event_attendees ORDER BY event_attendees.created_at DESC';
      const { rows } = await knex.raw(query);
      return rows.map((event_attendees) => new EventAttendee(event_attendees));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM event_attendees WHERE id = ?';
      const { rows: [event_attendee] } = await knex.raw(query, [id]);
      return event_attendee ? new EventAttendee(event_attendee) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(id, event_id, user_id, rsvp_status) {
    try {
      const query = `INSERT INTO event_attendees (event_id, user_id, rsvp_status)
        VALUES (?, ?, ?) RETURNING *`;
      const { rows: [event_attendee] } = await knex.raw(query, [event_id, user_id, rsvp_status]);
      return new EventAttendee(event_attendee);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  update = async (caption) => { 
    try {
      const [updatedEventAttendee] = await knex('event_attendees')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedEventAttendee ? new EventAttendee(updatedEventAttendee) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  static async delete(id) {
    try{
      const deleted = await knex.raw(`DELETE FROM event_attendees WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = EventAttendee;
