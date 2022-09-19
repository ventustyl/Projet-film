// Base de données MongoDB
// mongodb+srv://Admin:<password>@cluster0.84lq4zi.mongodb.net/?retryWrites=true&w=majority
// Login: Admin
// Mdp :RaFrMYWCFwT1tfSk
// Import de express JS 

const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const jwt = require('jsonwebtoken');
// --------------- Faker données fausses données
// const { faker } = require('@faker-js/faker');
// faker.locale = "fr";

const { expressjwt: expressJwt } = require("express-jwt");


// getting-started.js
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/MarvelBDD')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: cannot connect to BD'));
db.once('open', () => {
  console.log('connected to BD :)')
})


const movieSchema = mongoose.Schema({
  movietitle: String,
  movieyear: Number,
  moviedesc: String
});


const Movie = mongoose.model('Movie', movieSchema);

// const title = 'Terminator';
// const year = Math.floor(Math.random() * 80 + 1950);

// const myMovie = new Movie({ movietitle: title, movieyear: year });
// myMovie.save((err, savedMovie) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('savedMovie', savedMovie);
//   }
// });


let frenchMovies = [];


const secret = 'fg541n6fg54nb1d6fb5FVHYG0988678glbmùI89Y7gojhlibvl076glhvgfku76TF8Ggghjvb89';

// app.use(
//   expressJwt({
//     secret: "secret",
//     algorithms: ["HS256"]
//   }).unless({ path: ["/", 
//   "/login", 
//   "/css/style.css",
//    "/img/thor.png",
//     "/img/espace.jpg",
//     "/js/script.js"] })
// );

//Regler les Vues en ejs
app.set('views', './views');
app.set('view engine', 'ejs')

// Appel des middleware pour le css et le bodyparser
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use(express.static('js'))
//--------------------
// Appel de bodyParser pour recuperer le contenu du body
// app.use(bodyParser.urlencoded({extended:false}))
//--------------------
//Fonction get pour creer l'url
app.get('/movies', (req, res) => {
  const title = 'Liste de films à voir'
  frenchMovies = [];
  Movie.find((err,movies) => {
    if(err) {
      console.error('Ne fonctionne pas depuis la BD')
      res.sendStatus(500)
    } else {
frenchMovies = movies;
res.render('movie', { movies: frenchMovies, title: title });
    }
  })


 
})
// Passage du middleware sur un chemin unique
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post ('/movies', urlencodedParser, (req,res)=> {
//   console.log(req.body);
//   console.log(frenchMovies)
//   // req.body recupere l'ensemble des id sur le body
//   const newMovie = { title: req.body.movietitle, year: req.body.movieyear};
//   // ... raccourcie de push dans la function
//   frenchMovies = [...frenchMovies, newMovie];
//   console.log(frenchMovies)
//   res.sendStatus(201)
// })

// -----------------Methode multer -------------
app.post('/movies', upload.fields([]), (req, res) => {
  if (!req.body) {
    return res.sendStatus(500);
  } else {
    const formData = req.body;
    console.log('formData: ', formData);

    const title= req.body.movietitle;
    const year = req.body.movieyear;
    const myMovie = new Movie({ movietitle: title, movieyear: year });
    myMovie.save((err, savedMovie)=> {
      if (err) {
        console.error(err);
        return;
      }else{
        console.log(savedMovie);
        res.sendStatus(201);
      }
    })

    // const newMovie = { title: req.body.movietitle, year: req.body.movieyear};
    // frenchMovies = [...frenchMovies, newMovie];
    // console.log(frenchMovies)
    // res.sendStatus(201);
  }
})


app.get('/movies/add', (req, res) => {
  res.send('Prochainement un formulaire ici')
})

app.get('/movies/:id/:title', (req, res, next) => {

  const id = req.params.id;
  const title = req.params.title;
  // res.send(`film numero ${id}`);

  res.render('movie-details', { movieid: id, movietitle: title })
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', function (req, res) {
  res.send('about');
});

app.get('/Movie-search', function (req, res) {
  res.render('movie-search')
})

app.get('/Login', function (req, res) {
  res.render('login', { title: 'Espace membre' })
})

const fakeUser = { email: 'test@test.fr', password: 'qsd' };

app.post('/login', urlencodedParser, (req, res) => {
  console.log('login post', req.body);
  if (!req.body) {
    return res.sendStatus(500);
  } else {
    if (fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
      const mytoken = jwt.sign({ iss: 'http://movie.fr', user: 'Eric', role: 'admin' }, secret);

      res.json(mytoken);
    } else {
      res.sendStatus(401);
    }
  }
});

app.get('/member-only', (req, res) => {
  console.log('req.user', req.user);
  res.send(req.user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

