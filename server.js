const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
});

// PT2 GET request for "/restaurants/:id"
app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
})

// PT3 create express routes
app.use(express.json())
app.post('/restaurants', async (req, res) => {
    req.body = {name: "Vapiano", location: "Covent Garden", cuisine: "Italian"}
    const newRestaurant = req.body;
    const createNewRest = await Restaurant.create(newRestaurant);
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants);
})

app.use(express.json())
app.put('/restaurants/:id', async (req, res) => {
    let id = req.params.id;
    req.body = {name: "Nandos", location: "London", cuisine: "Brazilian"}
    const newRestaurant = req.body;
    const updateRestaurant = await Restaurant.update(newRestaurant, { where: { id: id } });
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})

app.use(express.json())
app.delete('/restaurants/:id', async (req, res) => {
    let id = req.params.id;
    const deleteRestaurant = await Restaurant.destroy({ where: { id: id } });
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})
    


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})