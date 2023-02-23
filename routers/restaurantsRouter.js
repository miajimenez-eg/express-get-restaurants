const express = require("express");
const router = express.Router();
const {Restaurant} = require('../models/index');
const {sequelize} = require("../db");
const {check, validationResult} = require("express-validator");

// routes
router.get('/', async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
});

// // PT2 GET request for "/restaurants/:id"
router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
})

// // PT3 create express routes
router.use(express.json())
router.post('/', [check("name", "location", "cuisine").not().isEmpty().trim(),], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()});
    } else {
        const newRestaurant = req.body;
        const createNewRest = await Restaurant.create(newRestaurant);
        const allRestaurants = await Restaurant.findAll()
        res.json(allRestaurants);
    }
})

router.use(express.json())
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    req.body = {name: "Nandos", location: "London", cuisine: "Brazilian"}
    const newRestaurant = req.body;
    const updateRestaurant = await Restaurant.update(newRestaurant, { where: { id: id } });
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})

router.use(express.json())
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const deleteRestaurant = await Restaurant.destroy({ where: { id: id } });
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})
    

module.exports = router;