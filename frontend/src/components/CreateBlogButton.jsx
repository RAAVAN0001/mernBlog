import { Box, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

const CreateBlogButton = () => {
    return (
        <Box position={'fixed'} bottom={90} right={50} height={10}  >
            <Link to={'/blogs/create'}>
                <Button variant='contained' sx={{ borderRadius: '50%', height: '60px', width: '50px' }}  >
                    <AddIcon />
                </Button>
            </Link>
        </Box>
    )
}

export default CreateBlogButton