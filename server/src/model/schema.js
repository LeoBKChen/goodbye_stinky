require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);
//server side's running js code called process, get env variable(DB_URL)

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    --DROP INDEX IF EXISTS posts_idx_text;
    --DROP INDEX IF EXISTS posts_idx_ts;
    DROP TABLE IF EXISTS Refridge;
    DROP TABLE IF EXISTS Freezer;
    --DROP TYPE IF EXISTS mood;

    -- Create

    CREATE TABLE Refridge (
        id              serial PRIMARY KEY NOT NULL,
        name            mood NOT NULL,
        category        category NOT NULL,
        quiantity       integer NOT NULL DEFAULT 1,
        unit            unit NOT NULL,
        isSetDeadline   boolean NOT NULL DEFAULT false,
        deadline        date NOT NULL,
        isAlarm   　　　　　boolean NOT NULL DEFAULT false,
        alarmDate       date NOT NULL,
        alarmTime       date NOT NULL,
        text    　　　　　　　text
    );
    CREATE TABLE Freezer (
        id              serial PRIMARY KEY NOT NULL,
        name            mood NOT NULL,
        category        category NOT NULL,
        quiantity       integer NOT NULL DEFAULT 1,
        unit            unit NOT NULL,
        isSetDeadline   boolean NOT NULL DEFAULT false,
        deadline        date NOT NULL,
        isAlarm   　　　　　boolean NOT NULL DEFAULT false,
        alarmDate       date NOT NULL,
        alarmTime       date NOT NULL,
        text    　　　　　　　text
    );    

`;
    // CREATE TYPE mood AS ENUM (
    //     'Clear',
    //     'Clouds',
    //     'Drizzle',
    //     'Rain',
    //     'Thunder',
    //     'Snow',
    //     'Windy'
    // );
    // CREATE INDEX posts_idx_ts ON posts USING btree(ts);
    // CREATE INDEX posts_idx_text ON posts USING gin(text gin_trgm_ops);

// const dataSql = `
//     -- Populate dummy posts
//     INSERT INTO posts (mood, text, ts)
//     SELECT
//         'Clear',
//         'word' || i || ' word' || (i+1) || ' word' || (i+2),
//         round(extract(epoch from now()) + (i - 1000000) * 3600.0)
//     FROM generate_series(1, 1000000) AS s(i);
// `;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    // db.none(dataSql).then(() => {
    //     console.log('Data populated');
    //     pgp.end();
    // });
    pgp.end();
}).catch(err => {
    console.log('Error creating schema', err);
});
