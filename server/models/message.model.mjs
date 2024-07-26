import connectionPool from "../configs/db.mjs";

export const createMessage = async (data) => {
  const { sender, receiver, matchId, message, media } = data;
  const currentDateTime = new Date();
  try {
    const result = await connectionPool.query(
      `INSERT INTO messages (
        sender_id, 
        receiver_id, 
        match_id, 
        message, 
        media_id, 
        sent_at, 
        updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $6)
      RETURNING *`,
      [
        sender,
        receiver,
        sender,
        receiver,
        matchId,
        message,
        media,
        currentDateTime,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};

export const getMessages = async (matchId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM messages WHERE match_id = $1`,
      [matchId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};
