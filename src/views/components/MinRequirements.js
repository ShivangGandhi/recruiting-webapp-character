import React from 'react'
import { Typography, Box, Button } from '@mui/material';

export default function MinRequirements({ classList, className, onClose }) {
    const requirements = classList[className];
    return (
        <Box>
            <Typography variant="h6">Minimum Requirements for {className}</Typography>
            {Object.keys(requirements).map(attr => (
                <Typography key={attr} variant="body1">
                    {`${attr}: ${requirements[attr]}`}
                </Typography>
            ))}
            <Button variant="outlined" onClick={onClose} style={{ marginTop: '10px' }}>
                Close Requirement View
            </Button>
        </Box>
    )
}