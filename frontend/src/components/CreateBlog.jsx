import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack, Typography } from '@mui/material';

const CreateBlog = () => {
    const [data, setData] = useState({
        title: '',
        content: ''
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'title' || name === 'content') {
            setData({ ...data, [name]: value });
        }
    };

    const handleButtonClick = () => {
        axios.post('http://localhost:5000/blogs/create', data)
            .then(response => {
                console.log('Blog created successfully:', response.data);
                // Add any additional logic you want to execute on successful creation
            })
            .catch(error => {
                console.error('Error creating blog:', error);
                // Handle the error, e.g., display an error message to the user
            });
    };

    return (
        <>
            <Box height={'100%'} width={'100%'} bgcolor={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <Stack width={'50%'} border={2}>
                    <Typography variant='h4' textAlign={'center'} sx={{ margin: '15px 0' }} children='Create Blog' />
                    <Input sx={{ marginTop: '15px' }} onChange={handleInput} value={data.title} name='title' placeholder='title' />
                    <Input sx={{ marginTop: '15px' }} onChange={handleInput} value={data.content} name='content' placeholder='content' />
                    <Button sx={{ margin: '15px 0' }} variant='contained' onClick={handleButtonClick} children='Add' />
                </Stack>
                
            </Box>
        </>
    );
};

export default CreateBlog;
