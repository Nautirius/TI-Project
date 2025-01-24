const express = require("express");
const jwt = require("jsonwebtoken");


module.exports = (db, JWT_SECRET) => {
    const router = express.Router();

    router.get("/data", checkToken, async (req, res) => {

        jwt.verify(req.token, JWT_SECRET, async (err, authorizedData) => {
            if(err){
                // if error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                try {
                    const settings = await db.query(
                        `SELECT num_rows, num_cols, delay
                         FROM e_learning.user_settings
                         WHERE user_id = $1`,
                        [authorizedData.user.userId]
                    );

                    res.json({
                        message: "Token zweryfikowany pomyślnie",
                        user: {
                            ...authorizedData.user,
                            settings: settings.rows[0]
                        },
                    });
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Błąd pobierania danych użytkownika");
                }
            }
        });
    });

    router.post("/save-settings", checkToken, async (req, res) => {
        const { numRows, numCols, delay } = req.body;

        jwt.verify(req.token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                console.log("ERROR: Could not verify token");
                return res.sendStatus(403);
            }

            try {
                // Update user settings in the database
                await db.query(
                    `UPDATE e_learning.user_settings
                     SET num_rows = $1, num_cols = $2, delay = $3
                     WHERE user_id = $4`,
                    [numRows, numCols, delay, authorizedData.user.userId]
                );

                res.status(200).json({ message: "Ustawienia zapisane pomyślnie" });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Błąd zapisywania ustawień");
            }
        });
    });

    return router;
}

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');

        req.token = bearer[1];
        next();
    } else {
        // if header is undefined return Forbidden (403)
        res.sendStatus(403);
    }
}
