import Users from "../models/Users.js";
import UserProfile from "../models/UserProfile.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, JSON } from "sequelize";
import DbContext from "../config/Database.js";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'fullname', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

async function checkUserExist(email) {
    const user = await Users.findAll({
        where: {
            email: email
        }
    });
    if (user.length > 0) {
        return user;
    }
    const userProfile = await UserProfile.findAll({
        where: {
            phoneNumber: email
        }
    });
    if (userProfile) {
        return await Users.findAll({
            where: {
                id: userProfile[0].userId
            }
        });
    } else {
        return false;
    }
}

export const Login = async (req, res) => {
    try {
        const user = await checkUserExist(req.body.email);
        if (user == false) return res.status(404).json({ msg: "User Not Found" });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const fullname = user[0].fullname;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, fullname, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s',
        });
        const refreshToken = jwt.sign({ userId, fullname, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refreshToken: accessToken }, {
            where: {
                id: userId
            }
        });
        await Users.update({ refreshToken: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.clearRequestTimeout();
        res.json({ accessToken: accessToken });
    } catch (error) {
        res.status(404).json({
            msg: "Email not found"
        });
    }
}

export const RegistrationAccount = async (req, res) => {
    let transaction;
    const { fullname, email, password, confpassword, phoneNumber } = req.body;
    const isExist = await Users.findOne({ where: { email } });
    if (isExist) return res.status(400).send({ message: "Email Already Registered" });
    if (password.length <= 8) return res.status(400).send({ message: "Minumum password 8 charaters" });
    if (password === password.toLowerCase()) return res.status(400).send({ message: "Password must be contains capitalize" });
    if (password !== confpassword) return res.status(400).send({ message: "Password doesn't match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        transaction = await DbContext.transaction();
        const userCreate = await Users.create({
            fullname: fullname,
            email: email,
            password: hashPassword,
            phoneNumber: phoneNumber,
            isRegistered: false
        }, { transaction });

        const userProfileCreate = await UserProfile.create({
            phoneNumber: phoneNumber,
            userId: userCreate.id
        }, { transaction });
        await transaction.commit();
        res.clearRequestTimeout();
        res.status(200).send({
            status: 200,
            message: "Registration Successfully",
            data: {
                user: userCreate,
                userProfile: userProfileCreate
            }
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const CompletedRegistrationAccount = async (req, res) => {
    let transaction;
    const { address, domicile, phoneNumber, dateOfBirth, identityNumber, job } = req.body;
    const userId = req.params.userId;
    try {
        const updatedUserData = {
            address: address,
            domicile: domicile,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth,
            identityNumber: identityNumber,
            job: job
        }
        const [rowProfileUpdated, updatedUserProfile] = await UserProfile.update(updatedUserData, {
            where: { userId: userId },
            returning: true,
        });
        if (rowProfileUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userUpdate = {
            isRegistered: true
        };
        const [rowUserUpdated, updatedUser] = await Users.update(userUpdate, {
            where: { id: userId },
            returning: true,
        });
        res.clearRequestTimeout();
        res.status(200).send({
            status: 200,
            message: "Completed Registration Success",
            data: updatedUserProfile
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!user[0]) return sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refreshToken: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}