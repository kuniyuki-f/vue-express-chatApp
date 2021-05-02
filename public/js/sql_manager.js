const mysql = require('mysql2/promise');


exports.db_setting = {
    host: "localhost",
    user: 'root',
    password: '',
    database: "express_db"
}

exports.sql_manager = class {
    constructor() {
        this.db_setting = this.db_setting
    }
    async sql(sql,) {
        try {
            this.con = await mysql.createConnection(this.db_setting);
            const [rows, fields] = await this.con.execute(sql);
            if (rows.length == 0) throw new Error('該当レコードがありません');
            return { rows: rows, fields: fields };
        } catch (e) {
            console.log(e);
        }
    }

    async insert(sql,) {
        try {
            this.con = await mysql.createConnection(this.db_setting);
            const [rows] = await this.con.query(sql);
            if (rows.insertId == 0) throw new Error('insertエラー');
            console.log("insert success:", rows);
            return { rows: rows }
        } catch (e) {
            console.log(e);
        }
    }

}

