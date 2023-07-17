const express = require('express')
const cors = require('cors')
const sequelize = require('./util/database');
const User = require('./models/user');
require('dotenv').config();

const app = express()
const PORT = 8000
app.use(express.json())
app.use(cors());

const userRoutes = require('./routes/user')

app.use(userRoutes);

app.use((req, res) => {
    res.status(404).json({error: "Page Not Found"})
})

// sequelize.sync({ force: true }) 
//   .then(() => {
//     console.log('User table created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating User table:', error);
//   });



app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`)
})