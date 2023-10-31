import DbContext from "../config/Database.js";

const createUserProfile = async (userProfileData) => {
    // Your service logic goes here
    const [userProfileCreate] = await DbContext.query(
        `INSERT INTO userprofile (identityNumber, userId, phoneNumber) 
        VALUES
        ('${userProfileData.insertId}', '${userProfileData.phoneNumber}')`
    );
    return userProfileCreate;
}

export { createUserProfile };