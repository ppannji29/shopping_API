import DbContext from "../config/Database.js";

const createUser = async (userData) => {
    // Your service logic goes here
    const [userCreate] = await DbContext.query(
        `INSERT INTO user (fullname, email, password, phoneNumber, isRegistered) 
        VALUES
        ('${userData.fullname}', '${userData.email}', '${userData.password}', '${userData.phoneNumber}', '${userData.isRegistered}')`
    );
    return userCreate;
}

export { createUser };