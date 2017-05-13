if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL); 
}

function list(isRefridge = false) {
    // const where = [];
    // if (searchText)
    //     where.push(`text ILIKE '%$1:value%'`);
    // if (start)
    //     where.push('id < $2');
    const where = isRefridge ? 'Refridge' : 'Freezer';
    const sql = `
        SELECT *
        FROM ${where}
        -- ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY category DESC
        -- LIMIT 10
    `;
    return db.any(sql, isRefridge);
}

function create(isRefridge = false, foodDetail) {
    const f = $2;
    
    const where = isRefridge ? 'Refridge' : 'Freezer';
    const sql = `
        INSERT INTO ${where} ($<this:name>)
        VALUES ($<f.name>, $<f.category>, $<f.quiantity>, $<f.unit>, $<f.isSetDeadline>, 
        $<f.deadline>, $<f.isAlarm>, $<f.alarmDate>, $<f.alarmTime>, $<f.text>)
        RETURNING *
    `;
    return db.one(sql, [isRefridge, foodDetail]);
}
/*function update(isRefridge, id, foodDetail){
    const where = isRefridge ? 'Refridge' : 'Freezer';
    const sql = `
        UPDATE FROM ${where} 
        WHERE id = $2
    `;
}*/
function remove(isRefridge, id){
    const where = isRefridge ? 'Refridge' : 'Freezer';
    const sql = `
        DELETE FROM ${where} 
        WHERE id = $2
    `;
    return db.any(sql, [isRefridge, id]);
}

module.exports = {
    list,
    create,
    remove
};
