// setup stuff
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); 


app.use('/api/acount', require('./routes/api/sign')) // ' /api/acount/signup ' & ' /api/acount/signin '

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));