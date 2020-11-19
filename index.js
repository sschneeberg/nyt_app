//set up
require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const api_key = process.env.API_KEY;
const db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }));

//db test

db.movie.findOrCreate({
    where: {
        title: 'Test movie',
        byline: 'test',
        headline: 'TEST',
        pub_date: Date.now(),
        url: 'https://thisisawebsite.com'

    }
}).then(response => console.log(response));

//routes
app.get('/:title', (req, res) => {
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${req.params.title}&api-key=${api_key}`).then(response => {
        if (response.status === 200) {
            let movies = [];
            for (let i = 0; i < response.data.results.length; i++) {
                let movieResult = response.data.results[i];
                let movieFinal = {
                    title: movieResult.display_title,
                    byline: movieResult.byline,
                    headline: movieResult.headline,
                    pubDate: movieResult.publication_date,
                    url: movieResult.link.url
                }
                movies.push(movieFinal);
            }
            return movies;
        }
    }).then(movies => {
        console.log(movies);
        res.render('results', { movies })
    }).catch(err => console.log(err))


})

app.listen(port, () => console.log('start'));