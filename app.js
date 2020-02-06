const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const snsHelper = require('./sns-helper');
const hbs = require('express-handlebars');

app.use(bodyParser.json({ limit: '1mb' }));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs'
}));

app.get('/status', (req, res) => {
    return res.json({ success: true });
});

app.get('/publish-home', (req, res) => {
    res.render('publish.hbs');
});

app.get('/publish-message', async (req, res) => {
    try{
        await snsHelper.publish(req.query.message, req.query.subject);
    }
    catch(ex) {
        res.render('result.hbs', {
            error: true
        });
    }
    res.render('result.hbs', {
        success: true
    });
});

app.get('/subscribe', async (req, res) => {
    res.render('subscribe.hbs');
});

app.listen(process.env.PORT || 5000, () => {
    console.log("SNS Publisher app listening on port 5000");
})