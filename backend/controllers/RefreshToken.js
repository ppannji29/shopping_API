import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        // console.log("REFRESH TOKEN >> ", refreshToken);
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refreshToken: refreshToken
            }
        });
        // console.log(user);
        if (!user[0]) return sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].id;
            const fullname = user[0].fullname;
            const email = user[0].email;
            const accessToken = jwt.sign({ userId, fullname, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            // res.json({ accessToken });
            res.status(200).send({ accessToken })
        })
    } catch (error) {
        console.log(error);
    }
}