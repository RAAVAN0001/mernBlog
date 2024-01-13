import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateBlogButton from './CreateBlogButton';
import homepic from '../assets/homepic-removebg-preview.png';
import bg from '../assets/bgimg.jpg';
import Blogs from './Blogs'

const Home = () => {
    const containerStyle = {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row',
        },
        alignItems: 'center',
    };

    return (
        <>

            <Box>
                <Box style={containerStyle}>
                    <Stack flex={1.5} sx={{ marginLeft: '50px' }} color={'white'}>
                        <Typography
                            sx={{ fontFamily: 'Roboto' }}
                            fontWeight={'bold'}
                            textTransform={'uppercase'}
                            variant={'h3'}
                        >
                            Welcome to Blog App
                        </Typography>
                        <Typography
                            sx={{ fontFamily: 'Short Stack' }}
                            fontWeight={'bold'}
                            textTransform={'uppercase'}
                            variant={'h4'}
                        >
                            Create your own blog and share with the world
                        </Typography>

                        <Button
                            sx={{ width: '200px' }}
                            href='/blogs'
                            variant='contained'
                            children='explore'
                        />
                    </Stack>
                    <Stack
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flex={1}
                    >
                        <img
                            src={homepic}
                            alt=""
                            className='img1fromhome'
                            style={{
                                width: '500px',
                                height: '500px',
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
            
            <CreateBlogButton />
        </>
    );
};

export default Home;
