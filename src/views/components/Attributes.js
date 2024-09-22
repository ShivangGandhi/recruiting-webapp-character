import React, { useState } from 'react';
import { Box, Typography, TextField, Alert } from '@mui/material';

const MAX_TOTAL_ATTRIBUTE_VALUE = 70;

export default function Attributes({ attributeList, attributes, setAttributes, calculateModifier }) {
    const [errorMessage, setErrorMessage] = useState('');

    const handleAttributeChange = (attr, value) => {
        const newValue = Number(value);
        const currentTotal = Object.values(attributes).reduce((sum, val) => sum + val, 0);
        const updatedTotal = currentTotal - attributes[attr] + newValue;

        if (newValue < 1) {
            setErrorMessage('Attribute values must be at least 1.');
            return;
        }

        if (updatedTotal > MAX_TOTAL_ATTRIBUTE_VALUE) {
            setErrorMessage(`Total value for all attributes must be less than ${MAX_TOTAL_ATTRIBUTE_VALUE}.`);
            return;
        } else {
            setErrorMessage('');
        }

        setAttributes((prev) => ({
            ...prev,
            [attr]: newValue,
        }));
    };

    return (
        <Box>
            <Typography variant="h6">Attributes</Typography>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            {attributeList.map((attr) => (
                <Box key={attr} mb={1}>
                    <Typography>{`${attr}:`}</Typography>
                    <TextField
                        type="number"
                        value={attributes[attr]}
                        onChange={(e) => handleAttributeChange(attr, e.target.value)}
                    />
                    <Typography>{`Modifier: ${calculateModifier(attributes[attr])}`}</Typography>
                </Box>
            ))}
        </Box>
    );
}
