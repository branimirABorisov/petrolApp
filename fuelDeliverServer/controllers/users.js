const router = require('express').Router();
const { register, login, getAllUsersByRole, updateUserRoleById, deleteUserById, logout, getUserById } = require('../services/users');
const mapErros = require('../utils/mapper');
const mongooseConnect = require('../utils/mongoose');

router.post('/register', async (req, res) => {
    await mongooseConnect();
    try {
        if (req.body.name.trim() == ''
            || req.body.companyName.trim() == ''
            || req.body.email.trim() == ''
            || req.body.vat.trim() == ''
            || req.body.phone.trim() == ''
            || req.body.address.trim() == ''
            || req.body.email.trim() == '') {
            throw new Error('Pleace fill all required fields!');
        }

        const result = await register(
            req.body.name.trim(),
            req.body.companyName.trim(),
            req.body.vat.trim(),
            req.body.phone.trim(),
            req.body.address.trim(),
            req.body.email.trim(),
            req.body.password.trim(),

        );

        res.json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    await mongooseConnect();

    try {

        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Pleace fill all required fields!');
        }
        const result = await login(
            req.body.email.trim().toLowerCase(),
            req.body.password.trim()
        );

        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})


router.get('/:role', async (req, res) => {
    await mongooseConnect();
    const role = req.params.role
    try {
        const result = await getAllUsersByRole(role);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})

router.get('/data/:userId', async (req, res) => {
    await mongooseConnect();

    const userId = req.params.userId;
    try {
        const result = await getUserById(userId);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})


router.put('/:userId', async (req, res) => {
    await mongooseConnect();

    const userId = req.params.userId;
    const userData = {
        name: req.body.name,
        companyName: req.body.companyName,
        vat: req.body.vat,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        userRole: req.body.userRole
    }

    try {
        const result = await updateUserRoleById(userId, userData)
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})

router.delete('/delete/:userId', async (req, res) => {
    await mongooseConnect();

    const userId = req.params.userId;

    try {
        await deleteUserById(userId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})

router.get('/logout', async (req, res) => {
    await mongooseConnect();

    logout();
    res.status(204).end();
})

module.exports = router;