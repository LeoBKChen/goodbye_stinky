if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(isRefrige) {

    if(isRefrige === 'true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    const sql = `
        SELECT *
        FROM ${where}
        ORDER BY category DESC
        -- LIMIT 10
    `;
    return db.any(sql, isRefrige);
}

function create(isRefrige, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text) {

    // console.log(isRefrige);

    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';


    const sql = `
        INSERT INTO ${where} (name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text)
        VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
    `;
    return db.one(sql, [isRefrige, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text]);
}

function update(isRefrige, id, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text){
    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';


    const sql = `
        UPDATE FROM ${where}
        SET name = $3, category = $4, quiantity = $5, unit = $6,
        isSetDeadline = $7, deadline = $8, isAlarm = $9,
        alarmDate = $10, alarmTime = $11, text = $12
        WHERE id = $2
        RETURNING *
    `;
    return db.one(sql, [isRefrige, id, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text]);
}
function remove(isRefrige, id){
    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    const sql = `
        DELETE FROM ${where}
        WHERE id = $2
    `;
    return db.any(sql, [isRefrige, id]);
}

module.exports = {
    list,
    create,
    update,
    remove
};
