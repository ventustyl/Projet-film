
// Import de express JS 
const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()

let frenchMovies= [];

//Regler les Vues en ejs
app.set('views', './views');
app.set('view engine', 'ejs')

// Appel des middleware pour le css et le bodyparser
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
//--------------------
// Appel de bodyParser pour recuperer le contenu du body
// app.use(bodyParser.urlencoded({extended:false}))
//--------------------
//Fonction get pour creer l'url
app.get('/movies', (req, res) => {
  const title = 'Liste de films à voir'
  frenchMovies = [
    {title: "Terminator", year : 2001},
    {title: "The Mask", year : 1999 },
    {title: "Denis la malice", year: 1995},
    {title: "Flash", year: 2023}
  ];

  res.render('movie', {movies: frenchMovies, title: title});
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
  if(!req.body){
    return res.sendStatus(500);
  }else {
    const formData = req.body;
    console.log ('formData: ', formData);
    const newMovie = { title: req.body.movietitle, year: req.body.movieyear};
    frenchMovies = [...frenchMovies, newMovie];
    console.log(frenchMovies)
    res.sendStatus(201);
  }
})


app.get('/movies/add', (req, res) => {
  res.send('Prochainement un formulaire ici')
})

app.get('/movies/:id/:title', (req, res, next) => {

  const id = req.params.id;
  const title =req.params.title;
  // res.send(`film numero ${id}`);

  res.render('movie-details', { movieid: id, movietitle:title })
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', function (req, res) {
  res.send('about');
});

app.get('/Movie-search', function (req,res){
  res.render('movie-search')
})

app.get('/Login', function(req,res){
  res.render('login', { title : 'Connexion'})
})

const fakeUser = { email: 'test@test.fr', password: 'qsd' };

app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body);
    if (!req.body) {
        return res.sendStatus(500);
    } else {        
        if(fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
            res.json({ 
                        email: 'test@testmail.fr', 
                        favoriteMovie: 'Il etait une fois dans l\'Ouest',
                        favoriteMovieTheater: 'Ciné TNB, 1 Rue Saint-Hélier, 35040 Rennes', 
                        lastLoginDate: new Date() 
                    });
        } else {
            res.sendStatus(401);
        } 
    } 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})