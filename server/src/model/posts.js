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
    const where = isRefrige ? 'Refrige' : 'Freezer';
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
    // console.log($2:name);
    // const f = $2;
    console.log(isRefrige);
    console.log(foodDetail);

    const where = isRefrige ? 'Refrige' : 'Freezer';
    const sql = `
        INSERT INTO ${where} ($<this:name>)
        VALUES ($<foodDetail.name>, $<foodDetail.category>, $<foodDetail.quiantity>, $<foodDetail.unit>, $<foodDetail.isSetDeadline>,
        $<foodDetail.deadline>, $<foodDetail.isAlarm>, $<foodDetail.alarmDate>, $<foodDetail.alarmTime>, $<foodDetail.text>)
        RETURNING *
    `;
    return db.one(sql, [isRefrige = false, foodDetail]);
}
function update(isRefrige = false, id, foodDetail){
    const where = isRefrige ? 'Refrige' : 'Freezer';
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
    const where = isRefrige ? 'Refrige' : 'Freezer';
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
