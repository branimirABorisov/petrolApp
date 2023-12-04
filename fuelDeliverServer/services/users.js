const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const JWT_SECRET = 'fdsfsdf@234r43ggg@Vcdcdcdchkefmrmtym56865umt)(#VVVVDFSDF213'
const blackList = [];


async function register (name, companyName, vat, phone, address, email, password, userRole) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') })
    
    if (existing) {
        throw new Error('Email is allready exists!');
    }

    const user = new User ({
        name,
        companyName,
        vat,
        phone,
        address,
        email,
        hashedPassword: await bcrypt.hash(password, 10),
        userRole
    });

    await user.save();
    return createSession(user);
}

function createSession(user) {
    if (user) {
        return {
            email: user.email,
            _id: user._id,
            accessToken: jwt.sign({
                name: user.name,
                companyName: user.companyName,
                vat: user.vat,
                phone: user.phone,
                address: user.address,
                email: user.email,
                _id: user._id,
                role: user.userRole  
            }, JWT_SECRET)
        };
    }
}


async function login (email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    
    if (!user){
        return { error: 'Incorrect email or password.' };
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match) {
        return { error: 'Incorrect email or password.' };
    }

    return createSession(user);
}



function verifySession(token) {
    if (blackList.includes(token)) {
        throw new Error('Token is invalidated.')
    }

    const payload = jwt.verify(token, JWT_SECRET);
    return {
        email: payload.email,
        role: payload.role,
        _id: payload._id,
        token
    }
}


async function getAllUsersByRole (role) {
    return User.find({userRole: role});
}


async function getUserById (userId) {
    return await User.findById({_id: userId})
}


async function updateClient (clientId, data) {

    try {
        const clientData = await User.findByIdAndUpdate(
            clientId,
            { 
                name: data.name,
                companyName: data.companyName,
                vat: data.vat,
                phone: data.phone,
                address: data.address,
                email: data.email,
                userRole: data.userRole
            },
            {new: true}
        )
        return clientData;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error updating user role'); 
    }
}

async function deleteUserById (userId){
    try {
        
    return await User.findOneAndDelete({ _id: userId });

    } catch (err) {
        console.error(err.message);
        throw new Error('Error deleting user'); 
    }
}

function logout(token) {
    blackList.push(token)
}


module.exports = {
    register,
    login,
    verifySession,
    logout,
    getAllUsersByRole,
    updateUserRoleById: updateClient,
    deleteUserById,
    getUserById
}
