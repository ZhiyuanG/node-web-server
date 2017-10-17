const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// /views is the default view directory for express
app.set('view engine', 'hbs');
// app.use takes the middleware function you want to use
// express.static is a built-in middleware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(now + ': ' + req.method + req.url);
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello My Website'
    })
})

app.get('/about', (req, res) => {
    //res.render() let you render any template view you have set up
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.listen(3000, () => {
    console.log('Server is starting.')
});