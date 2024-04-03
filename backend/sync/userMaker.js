const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const createAdminUser = async () => {
    const plainTextPassword = 'admin';
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    try {
        const adminUser = await User.create({
            username: 'admin',
            password: hashedPassword,
            name: 'admin',
            email: 'wibu1892001@gmail.com',
        });


    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

module.exports = createAdminUser;
