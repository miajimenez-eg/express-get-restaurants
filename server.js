const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const restaurant = require("./routers/restaurantsRouter");

const port = 3000;

app.use(express.json());
app.use('/restaurants', restaurant);
app.use('/restaurants/:id', restaurant);


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})