import { Box, Button, Input, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useSnackbar } from 'notistack'

const Login = () => {

    const { enqueueSnackbar } = useSnackbar()
    const [error, setError] = useState(null);


    const handleInput = (e, field) => {
        const value = e.target.value;
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/login/', data);
            console.log(response);
            if (response.status === 200) {
                // console.log('success');
                enqueueSnackbar("Login success", { variant: "success", autoHideDuration: 3000 });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    // console.error(error.response.data.message); // Set the error message in state
                    enqueueSnackbar(`${error.response.data.message}`, { variant: "error", autoHideDuration: 3000 });
                } else {
                    console.error("Error response from server:", error.response.data.message);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error during request setup:", error.message);
            }
        }
    };


    const [data, setData] = useState({
        username: "",
        password: ""
    });

    return (
        <>
            <Box sx={{ height: '100vh', width: '100%' }} display={'flex'} bgcolor={'#191919'}
                justifyContent={'center'} alignItems={'center'} >
                <Stack bgcolor={'white'} width={'40%'} borderRadius={2} direction={'column'} alignItems={'center'}>
                    <Typography variant="h3" sx={{ margin: "30px 0" }} textAlign={'center'} textTransform={'uppercase'}>Login</Typography>
                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name="username"
                        type="text"
                        value={data.username}
                        placeholder="username..."
                        onChange={(e) => handleInput(e, 'username')}
                    />
                    <Input
                        sx={{ width: '40%', margin: "10px 0" }}
                        name="password"
                        type="password"
                        value={data.password}
                        placeholder="password..."
                        onChange={(e) => handleInput(e, 'password')}
                    />
                    <Button sx={{ margin: "20px 0" }} onClick={handleSubmit} variant="contained">submit</Button>
                    <Typography variant="subtitle1"> <Link to={'/registration'}>Are you a new user?</Link></Typography>

                </Stack>


            </Box>
        </>
    );
};

export default Login;