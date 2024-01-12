import express from 'express';
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
app.use(cors())


configDotenv();

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};
connectDB();

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes); // Mount the blog routes before the generic route handler

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
