import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Alert } from '@mui/material';


export default function Skills({ skillList, attributes, skillAllocations, setSkillAllocations, calculateModifier }) {

    const intelligenceModifier = calculateModifier(attributes.Intelligence);
    const totalPoints = 10 + 4 * intelligenceModifier;

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        const initialAllocations = skillList.reduce((acc, skill) => {
            if (!acc[skill.name]) {
                acc[skill.name] = 0;
            }
            return acc;
        }, { ...skillAllocations });

        setSkillAllocations((prev) => ({ ...prev, ...initialAllocations }));
    }, [setSkillAllocations, skillList, skillAllocations]);

    const getTotalSkillValue = (skill) => {
        const pointsSpent = skillAllocations[skill.name] || 0;
        const modifier = attributes[skill.attributeModifier] ? calculateModifier(attributes[skill.attributeModifier]) : 0;
        return pointsSpent + modifier;
    };


    const getTotalPointsSpent = () => {
        return Object.values(skillAllocations).reduce((acc, val) => acc + val, 0);
    };

    const handleAllocationChange = (skill, value) => {
        const newValue = Math.max(0, Number(value));
        const totalSpent = getTotalPointsSpent();
        const newTotalSpent = totalSpent - (skillAllocations[skill] || 0) + newValue;

        if (newTotalSpent > totalPoints) {
            setErrorMessage(`You need more skill points! Upgrade intelligence to get more.`);
            return;
        }

        setErrorMessage('');
        setSkillAllocations((prev) => ({ ...prev, [skill]: newValue }));
    };

    return (
        <Box>
            <Typography variant="h6">Skills</Typography>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            <Typography variant="body1">{`Total skill points available: ${totalPoints}`}</Typography>
            {skillList.map((skill) => (
                <Box key={skill.name} mb={1} display="flex" alignItems="center">
                    <Typography style={{ marginRight: '10px' }}>
                        {`${skill.name}: ${skillAllocations[skill.name] || 0}(Modifier: ${skill.attributeModifier}): ${calculateModifier(attributes[skill.attributeModifier] || 0)} Total: ${getTotalSkillValue(skill)}`}
                    </Typography>
                    <TextField
                        type="number"
                        value={skillAllocations[skill.name] || 0}
                        onChange={(e) => handleAllocationChange(skill.name, e.target.value)}
                        style={{ width: '60px' }}
                    />
                </Box>
            ))}
        </Box>
    );
}
