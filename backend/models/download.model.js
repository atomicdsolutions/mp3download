const mongoose = require('mongoose');

const schema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    downloadDate: {
        type: Date,
        default: Date.now
    },
    path: String,  // Path to the stored download
    metadata: {
        title: String,
        artist: String,
        album: String,
        genre: [String],
        duration: Number,
        comment: String
    }
}, { timestamps: true });

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Download = mongoose.model("download", schema);
module.exports = Download;
