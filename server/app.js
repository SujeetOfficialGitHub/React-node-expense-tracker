const express = require('express')
const cors = require('cors')
const sequelize = require('./util/database');

const dotenv = require('dotenv')
dotenv.config();

const app = express()
const PORT = 8000
app.use(express.json())
app.use(cors());

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use(userRoutes);
app.use(expenseRoutes);

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