import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(
    `    
      SELECT * FROM pacients WHERE email=$1
    `,
    [email]
  );
}

async function create({ name, email, password }) {
  await db.query(
    `
INSERT INTO pacients (name, email, password)
VALUES ($1, $2, $3);
      `,
    [name, email, password]
  );
}

export default {
  findByEmail,
  create,
};
