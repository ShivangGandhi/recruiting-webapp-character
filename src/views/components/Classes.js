import React from 'react'
import { Typography, Box } from '@mui/material'

export default function Classes({ classList, userAttributes, onClassSelect }) {
    return (
        <Box mb={2}>
            <Typography variant="h6">Classes</Typography>
            {Object.keys(classList).map((className) => {
                const requirements = classList[className];
                const isEligible = Object.keys(requirements).every(attr =>
                    userAttributes[attr] >= requirements[attr]
                );

                return (
                    <Typography
                        key={className}
                        variant="body1"
                        style={{ color: isEligible ? 'red' : 'black', cursor: 'pointer' }}
                        onClick={() => onClassSelect(isEligible ? className : null)}
                    >
                        {className}
                    </Typography>
                );
            })}
        </Box>
    )
}