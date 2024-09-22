import React from 'react';
import { Button, TextField, Typography, Box, Grid2 } from '@mui/material';

const SkillCheck = () => {
    return (
        <Box mb={1} display="flex" alignItems="center">
            <Grid2><Typography variant="h6">Skill Check</Typography></Grid2>
            <Grid2 ml={5}><TextField label="DC" variant="outlined" type="number" margin="normal" /></Grid2>
            <Grid2 ml={5}><Button variant="contained" color="primary">Roll</Button></Grid2>
        </Box>
    );
};

export default SkillCheck;
