const express = require('express');

const callback = require('./async/callback');
const promise = require('./async/promise');
const asyncAwait = require('./async/async-await');

const app = express();
app.use('/', express.static('frontend'));

app.get('/callback', (req, res) => {
    callback.readdir((err, files) => {
        if (err) {
            return res.send('Pas bon');
        }
        return res.send(files);
    });
});
app.get('/promise', (req, res) => {
    promise.readAlpsDir()
        .then(files => res.send(files))
        .catch(error => res.send('Pas bon'));
});
app.get('/async', async (req, res) => {
    try {
        const files = await asyncAwait.readAlpsDir();
        res.send(files);
    } catch (error) {
        res.send('Pas bon');
    }
});

function startExpressJS() {
    app.listen(3000, () => {
        console.log('Listening on http://localhost:3000');
    });
}

exports.start = startExpressJS;
