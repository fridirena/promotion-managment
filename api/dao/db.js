const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const connectionString = "mongodb+srv://moonactive:moonactive@clustermoonactive.m0osa.mongodb.net/MoonActive?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

module.exports = {db: mongoose, paging: mongoosePaginate};