const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");


module.exports = (db, JWT_SECRET) => {
    const router = express.Router();

    router.post(
        "/register",
        [
            body("email").isEmail().withMessage("Nieprawidłowy email"),
            body("firstName").notEmpty().withMessage("Imię jest wymagane"),
            body("lastName").notEmpty().withMessage("Nazwisko jest wymagane"),
            body("password").isLength({min: 6}).withMessage("Hasło musi mieć co najmniej 6 znaków"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const {
                firstName,
                lastName,
                birthDate,
                email,
                password
            } = req.body;

            try {
                // check whether email already exists
                const userExists = await db.query("SELECT * FROM e_learning.users WHERE email = $1", [email]);
                if (userExists.rows.length > 0) {
                    return res.status(400).json({error: "Konto z podanym adresem e-mail już istnieje"});
                }

                // password encryption
                const hashedPassword = await bcrypt.hash(password, 10);

                // add a new user to the database
                const newUser = await db.query(
                    `INSERT INTO e_learning.users (first_name, last_name, birth_date, email, password)
                     VALUES ($1, $2, $3, $4, $5)
                     RETURNING *`,
                    [firstName, lastName, birthDate, email, hashedPassword]
                );

                // Create default settings for the user
                const settings = await db.query(
                    `INSERT INTO e_learning.user_settings (user_id) VALUES ($1) RETURNING *`,
                    [newUser.rows[0].user_id]
                );

                const userData = {
                    userId: newUser.rows[0].user_id,
                    firstName: newUser.rows[0].first_name,
                    lastName: newUser.rows[0].last_name,
                    birthDate: newUser.rows[0].birth_date,
                    email: newUser.rows[0].email
                }

                res.json({
                    message: "Zarejestrowano pomyślnie",
                    // user: {
                    //     ...userData.user,
                    //     settings: settings.rows[0],
                    // },
                });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Błąd serwera");
            }
        }
    );

    router.post("/login", async (req, res) => {
        const {email, password} = req.body;

        try {
            // find the user by email value
            const user = await db.query("SELECT * FROM e_learning.users WHERE email = $1", [email]);
            if (user.rows.length === 0) {
                return res.status(400).json({error: "Nieprawidłowy e-mail lub hasło"});
            }

            // compare passwords
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (!validPassword) {
                return res.status(400).json({error: "Nieprawidłowy e-mail lub hasło"});
            }

            // generate JWT
            const userData = {
                userId: user.rows[0].user_id,
                firstName: user.rows[0].first_name,
                lastName: user.rows[0].last_name,
                birthDate: user.rows[0].birth_date,
                email: user.rows[0].email,
            }
            const token = jwt.sign({user: userData}, JWT_SECRET, {expiresIn: "1h"});

            // get user settings
            const settings = await db.query(
                `SELECT num_rows, num_cols, delay
                         FROM e_learning.user_settings
                         WHERE user_id = $1`,
                [userData.userId]
            );

            res.json({
                token,
                user: {
                    ...userData,
                    settings: settings.rows[0]
                },
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Błąd logowania");
        }
    });

    return router;
}
