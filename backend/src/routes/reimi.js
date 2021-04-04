const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    if (req.param('name') != undefined) {
        res.send('Goodbye, ' + req.param('name'));
    }
    else {
        res.send('<h1>Goodbye, world!</h1>');
    }

    console.log('Someone disconnected from the server!');
});

module.exports = router;
