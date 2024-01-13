import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack, TextField, Typography } from '@mui/material';
import hello from '../assets/svelte-welcome.c18bcf5a.webp'

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <Stack direction={'column'} height={'100vh'} bgcolor={'white'} width={'100%'} alignItems={'center'} >
                <Box height={'20%'} marginTop={10} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                    <img src={hello} alt="" className='helo' />
                </Box>
                <Box width={'100%'} bgcolor={'white'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} p={10} gap={5} >
                    <Stack border={1} borderRadius={2} flex={1.5} >
                        <Typography variant='h4' textAlign={'center'} sx={{ margin: '15px 0' }} children="WHAT'S UP" />
                        <TextField
                            onChange={handleInput} value={data.title} name='title'
                            id="filled-multiline-static"
                            label="Title"
                            multiline
                            rows={2}

                            variant="filled"
                        />
                        <TextField
                            onChange={handleInput} value={data.content} name='content'
                            variant="filled"
                            label="Content"
                            multiline
                            rows={4}
                        />

                    </Stack>
                    <Box flex={1} border={1} height={'100%'} borderRadius={2} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Box>
                </Box>
                <Button sx={{ margin: '30px 0', width: '150px' }} variant='contained' onClick={handleButtonClick} children='Add' />
            </Stack>
        </>
    );
};

export default CreateBlog;
