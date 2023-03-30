import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(
    `    
      SELECT * FROM doctors WHERE email=$1
    `,
    [email]
  );
}

async function create({ name, email, password, role, state, citie }) {
  await db.query(
    `
INSERT INTO doctors (name, email, password, role_id, state_id, citie_id)
VALUES ($1, $2, $3, (SELECT id FROM roles WHERE role = $4), (SELECT id FROM states WHERE state = $5), (SELECT id FROM cities WHERE citie = $6));
      `,
    [name, email, password, role, state, citie]
  );
}

async function createDocData({ role, state, citie }) {
  console.log(role, state, citie);
  return await db.query(
    `
    WITH new_role AS (
        INSERT INTO roles (role)
        SELECT $1::varchar
        WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role = $1::varchar)
        RETURNING id
      ),
      new_state AS (
        INSERT INTO states (state)
        SELECT $2::varchar
        WHERE NOT EXISTS (SELECT 1 FROM states WHERE state = $2::varchar)
        RETURNING id
      ),
      new_city AS (
        INSERT INTO cities (citie)
        SELECT $3::varchar
        WHERE NOT EXISTS (SELECT 1 FROM cities WHERE citie = $3::varchar)
        RETURNING id
      )
    SELECT NULL FROM new_role, new_state, new_city;
    
`,
    [role, state, citie]
  );
}

export default {
  findByEmail,
  createDocData,
  create,
};
