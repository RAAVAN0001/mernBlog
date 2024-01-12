import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Input, Stack, Typography } from "@mui/material"
import axio from 'axios'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Registration = () => {
    
    const { enqueueSnackbar } = useSnackbar()
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/user/registration/",
                data
            );

            if (response.status === 201) {
                console.log("Registration success");
                enqueueSnackbar("Registration success", { variant: "success", autoHideDuration: '2' });

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    // console.error(error.response.data.message);
                    setError(error.response.data.message)
                    enqueueSnackbar(`${error.response.data.message}`, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                } else {
                    console.error("Error during request setup:", error.message);
                }
            }
        };
    }


    const [data, setData] = useState({
        username: "",
        name: {
            firstName: "",
            lastName: ""
        },
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'username' || name === 'email' || name === 'password') {
            // For username, email, and password, update directly
            setData({ ...data, [name]: value });
        } else if (name === 'firstName' || name === 'lastName') {
            // If the input is for the name field, update the nested object
            const updatedName = { ...data.name, [name]: value };
            setData({ ...data, name: updatedName });
        }
    };






    return (
        <>
            <Box sx={{ height: '100vh', width: '100%' }} display={'flex'} bgcolor={'#191919'}
                justifyContent={'center'} alignItems={'center'} >
                <Stack bgcolor={'white'} width={'40%'} borderRadius={2} direction={'column'} alignItems={'center'}>
                    <Typography variant="h3" sx={{ margin: "30px 0" }} textAlign={'center'} textTransform={'uppercase'} fontWeight={'bold'}  >Registration</Typography>
                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name='username'
                        value={data.username}
                        type="text"
                        placeholder="username..."
                        onChange={handleInput}
                    />

                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name='firstName'
                        value={data.name.firstName}
                        type="text"
                        placeholder="first name..."
                        onChange={handleInput}
                    />

                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name='lastName'
                        value={data.name.lastName}
                        type="text"
                        placeholder="last name..."
                        onChange={handleInput}
                    />

                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name='email'
                        value={data.email}
                        type="text"
                        placeholder="email..."
                        onChange={handleInput}
                    />

                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name='password'
                        value={data.password}
                        type="password"
                        placeholder="password..."
                        onChange={handleInput}
                    />

                    {/* <Box sx={{ width: '80%', height: '10px' }} textAlign={'center'} >{errorMessage()}</Box> */}

                    <Button sx={{ margin: "40px 0" }} variant="contained" onClick={handleSubmit}>submit</Button>
                    <Typography variant="subtitle1"> <Link to={'/login'}  > already has an account ?</Link></Typography>

                </Stack>
            </Box>

        </>
    )
}

export default Registration