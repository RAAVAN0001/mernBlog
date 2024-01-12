import express from 'express'
import Blog from '../models/blog.model.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/create', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newBlog = new Blog({
            title,
            content,
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error('Something went wrong while creating blog', error);
        res.status(500).json({ message: 'Try again, something went wrong' });
    }
});



router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'There is no blog with this id' });
        }

        await blog.deleteOne(); // Ensure the deletion is asynchronous

        res.status(200).json({ message: 'Blog deleted successfully' });

    } catch (error) {
        console.error('Something went wrong', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


router.patch('/edit/:id', async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'There is no blog with this id' });
        }

        blog.title = title;
        blog.content = content;
        await blog.save();

        res.status(200).json({ message: 'Blog updated successfully', updatedBlog: blog });
    } catch (error) {
        console.error('Something went wrong', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


export default router