import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Stack,

} from '@mui/material';
import thumbnail from '../assets/wp9256810-gangster-monkey-wallpapers.jpg'
import CreateBlogButton from './CreateBlogButton';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/blogs/');
                setBlogs(response.data);
                console.log(response.data)
                // Assuming response.data is an array of objects, each containing a "blog" property with the title

                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    const formatDate = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
           
        };

        const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);
        return formattedDate;
    };




    return (
        <Box
            width={'100%'}
            height={'100%'}
            bgcolor={'white'}
            gap={2}
        >
            <Typography variant='h1' fontWeight={'bold'} textAlign={'center'}>Blogs</Typography>
            <Box
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'space-around'}
            >
                {blogs.map((item) => (
                    <Stack
                        key={item._id}
                        direction={'column'}
                        justifyContent={'center'}
                        spacing={2}
                        // padding={'px'}
                        border={1}
                        width={'30%'}
                        borderRadius={5}
                        margin={'20px'}
                    >
                        <img src={thumbnail} alt="" className='img' loading='lazy' />
                        <Box p={'0 10px'}>
                            <Typography variant={'h5'} fontWeight={'bold'}>{item.title}</Typography>
                            <Typography
                                variant='p'
                                color={'gray'}
                                fontSize={'.8rem'}
                                sx={{
                                    marginBottom: '15px'
                                }}
                            >{formatDate(item.createdAt)}</Typography>
                            <Typography
                                sx={{
                                    lineHeight: '1.2em',
                                    maxHeight: '2.4em',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }}
                                variant="text2"
                            >{item.content}</Typography>
                        </Box>
                        <Button variant={'contained'} sx={{width:'50%'}}  >Explore Blogs</Button>
                    </Stack>
                ))}
            </Box>

            <CreateBlogButton />

        </Box>
    );
}
export default Blogs;
