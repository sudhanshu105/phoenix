const fs = require('fs');
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    user: "avnadmin",
    password: "AVNS_-qIOu_2GPRSMjpFiwCZ",
    host: "pg-34837887-aaweeye07-6d25.f.aivencloud.com",
    port: 25738,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('ca.pem').toString(),
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err) {
        console.error('Connection error:', err);
        return;
    }
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err) {
            console.error('Query error:', err);
            return;
        }

        console.log('PostgreSQL version:', result.rows[0].version);
        client.end(function (err) {
            if (err) {
                console.error('Error closing connection:', err);
            }
        });
    });
});
