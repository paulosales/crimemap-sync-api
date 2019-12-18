const db = require('./db');

const importLogSchema = new db.Schema({
    date: Date,
    message: String
});

const importSchema = new db.Schema({
    startDate: Date,
    finishDate: Date,
    status: String,
    logs: [ importLogSchema ]
});

const Import = db.model('Import', importSchema);
const ImportLog = db.model('ImportLog', importLogSchema);

module.exports = {
    Import, ImportLog
};
