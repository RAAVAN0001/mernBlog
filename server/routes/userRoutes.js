import express from 'express';
import User from '../models/user.model.js'; // Import your User model
import bcrypt from 'bcryptjs'


const router = express.Router();

router.post('/registration', async (req, res) => {
    const { username, name, email, password, bio } = req.body;
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(409).json({ message: `${username} already exists` });
        } else {
            const existingEmailUser = await User.findOne({ email });
            
            if (existingEmailUser) {
                res.status(409).json({ message: `${email} already exists` });
            } else {
                // Hash the password using bcrypt
                const hashedPassword = await bcrypt.hash(password, 8);

                const user = new User({ username, name, email, password: hashedPassword, bio });

                await user.save();
                res.status(201).json({ message: `${username} user created successfully` });
            }
        }
    } catch (error) {
        console.error('Something went wrong: ', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ message: `${username} does not exist` });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: `${username} logged in successfully` });

    } catch (error) {
        console.error('Something went wrong while logging in. Try again.', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


router.patch('/update', async (req, res) => {
    const { name, bio } = req.body;

    try {

        const existingUser = await User.findOne({ username: req.body.username })
        if (!existingUser) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        existingUser.username = username
        if (name) {
            existingUser.name = name;
        }

        if (bio) {
            existingUser.bio = bio;
        }
        await existingUser.save();

        res.status(200).json({ message: 'credentials updated successfully' })

    } catch (error) {
        console.error('something went wrong while updating try again', error)
        res.status(400).json({ message: 'something went wrong' })
    }
})


router.patch('/password', async (req, res) => {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New password and confirm password don't match" });
    }

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Something went wrong while updating password' });
    }
});








export default router