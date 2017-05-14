if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL); 
}

function list(isRefrige = false) {
    // const where = [];
    // if (searchText)
    //     where.push(`text ILIKE '%$1:value%'`);
    // if (start)
    //     where.push('id < $2');
    const where = $1 ? 'Refrige' : 'Freezer';
    const sql = `
        SELECT *
        FROM ${where}
        -- ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY category DESC
        -- LIMIT 10
    `;
    return db.any(sql, isRefrige);
}

function create(isRefrige = false, foodDetail) {
    const f = $2;
    
    const where = $1 ? 'Refrige' : 'Freezer';
    const sql = `
        INSERT INTO ${where} ($<this:name>)
        VALUES ($<f.name>, $<f.category>, $<f.quiantity>, $<f.unit>, $<f.isSetDeadline>, 
        $<f.deadline>, $<f.isAlarm>, $<f.alarmDate>, $<f.alarmTime>, $<f.text>)
        RETURNING *
    `;
    return db.one(sql, [isRefrige, foodDetail]);
}
function update(isRefrige, id, foodDetail){
    const where = $1 ? 'Refrige' : 'Freezer';
    const f = $3;

    const sql = `
        UPDATE FROM ${where} 
        SET name = $<f.name>, category = $<f.category>, quiantity = $<f.quiantity>, unit = $<f.unit>, 
        isSetDeadline = $<f.isSetDeadline>, deadline = $<f.deadline>, isAlarm = $<f.isAlarm>, 
        alarmDate = $<f.alarmDate>, alarmTime = $<f.alarmTime>, text = $<f.text>
        WHERE id = $2
        RETURNING *
    `;
    return db.one(sql, [isRefrige, id, foodDetail]);
}
function remove(isRefrige = false, id){
    const where = $1 ? 'Refrige' : 'Freezer';
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
