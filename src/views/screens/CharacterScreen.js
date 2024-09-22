import { Button, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Attributes from '../components/Attributes';
import Classes from '../components/Classes';
import MinRequirements from '../components/MinRequirements';
import Skills from '../components/Skills';
import SkillCheck from '../components/SkillCheck';
import { getCharacters, postCharacter, selectCharacters } from '../../redux/slices/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { calculateModifier } from '../../utils/calculations';


const defaultAttributes = {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 9,
};

export default function CharacterScreen({ attributeList, classList, skillList }) {
    const dispatch = useDispatch();
    const characters = useSelector(selectCharacters);


    useEffect(() => {
        // This is implemented to set character data based on the data received from GET API Call.
        // So as i have only implemented functionality for 1 character, I am setting the only character instead of setting a character list.
        // If multiple character implementation would have been done, the character components would be mapped based on this list fetched

        if (characters.attributes != null || characters.skills != null) {
            setAttributes(characters.attributes ?? defaultAttributes);
            setSkillAllocations(characters.skills ?? {});
        } else {
            console.log('No characters found, using default values');
            setAttributes(defaultAttributes);
            setSkillAllocations({});
        }
    }, [characters]);

    const [attributes, setAttributes] = useState(defaultAttributes);
    const [skillAllocations, setSkillAllocations] = useState({});
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        dispatch(getCharacters());
    }, [dispatch]);

    const handleClassSelect = (className) => {
        setSelectedClass(className);
    };

    const handleCloseRequirements = () => {
        setSelectedClass(null);
    };

    const handleSaveCharacter = () => {
        // I am creating a json of characterData and then storing only as character object instead of list
        // For multiple character implementation, this data would have been appended to a list of characters and then the list would have been sent as a POST request payload.
        const characterData = {
            attributes: attributes,
            skills: skillAllocations,
        };
        dispatch(postCharacter({ characters: characterData }));
    };

    return (
        <Grid2>
            <Grid2 mb={2}>
                <Button variant="contained" color="primary" onClick={handleSaveCharacter}>
                    Save Character
                </Button>
            </Grid2>
            <Grid2 mb={2} alignItems={'center'}>
                <SkillCheck />
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2 item xs={3}>
                    <Attributes attributeList={attributeList} attributes={attributes} setAttributes={setAttributes} calculateModifier={calculateModifier} />
                </Grid2>
                <Grid2 item xs={3} ml={10}>
                    <Classes classList={classList} userAttributes={attributes} onClassSelect={handleClassSelect} />
                </Grid2>
                {selectedClass && (
                    <Grid2 item xs={3} ml={10}>
                        <MinRequirements classList={classList} className={selectedClass} onClose={handleCloseRequirements} />
                    </Grid2>
                )}
                <Grid2 item xs={3} ml={5}>
                    <Skills skillList={skillList} attributes={attributes} skillAllocations={skillAllocations} setSkillAllocations={setSkillAllocations} calculateModifier={calculateModifier} />
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
