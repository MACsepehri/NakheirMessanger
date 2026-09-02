const express = require("express"); // for rest api
const Router = express.Router(); // for adding api
const bcrypt = require("bcrypt"); // for hashing password
const { PrismaClient } = require("../../generated/prisma");// for schema and adding and... things to DB
const { PrismaMariaDb } = require("@prisma/adapter-mariadb"); // for schema and adding and... things to DB and mySQL
const { validationTest } = require("../../utils/validation"); // for testing the validation
require('dotenv').config(); // for reading things from .env

// important!!! use this for checking password in loggin :
// const isValid = await bcrypt.compare(
//     user_password,
//     user.user_password
// );

const adapter = new PrismaMariaDb({ // for connecting to the DB 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const prisma = new PrismaClient({ // for connecting to the DB 
    adapter
});

Router.post("/signup" , async (req, res) => { // this is a API for SignUp .
    try { // for error handling
        const { user_name, name_user, user_password } = req.body; // getting things from body
        validationTest(user_name, name_user ,user_password); // testing the validation

        const validation = validationTest( // for validation test
            user_name,
            name_user,
            user_password
        );

        if (!validation.ok) { // for validation test
            return res.status(400).json(validation);
        }

        const user = await prisma.user.findFirst({ // finding user
            where: {
                user_name: user_name, // filter
                name_user: name_user // filter
            }
        });

        const hashedPassword = await bcrypt.hash(user_password, 12); // hashing the password

        const finalUser = { // creating the user 
            user_name: user_name,
            name_user: name_user,
            user_password: hashedPassword
        }

        const createUser = await prisma.user.create({ // adding user to DB
            data: finalUser
        });

        const resUser = { // creating the user for res
            user_name: user_name,
            name_user: name_user
        }

        res.status(201).json({ // for the success response
            message: "Acount successfuly created .",
            user: resUser
        });

    } catch (err) { // still for error handling
        res.status(500).json({ error: err.message }); // returning the err if it exist.
    }
});
 


Router.post('/signin', async (req, res) => {
    
});


module.exports = Router;