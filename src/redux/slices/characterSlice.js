import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacters, saveCharacters } from "../../api/characterApi";

const initialState = {
    characters: [],
    attributes: [],
    status: 'idle',
    error: null,
};

export const getCharacters = createAsyncThunk(
    'character/loadCharacters',
    async () => {
        const characters = await fetchCharacters();
        return characters;
    }
);

export const postCharacter = createAsyncThunk(
    'character/saveNewCharacter',
    async ({ characters }) => {
        const newCharacter = await saveCharacters(characters);
        return newCharacter;
    }
);

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCharacters.fulfilled, (state, action) => {
                state.characters = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postCharacter.fulfilled, (state, action) => {
                state.characters.push(action.payload);
            });
    }
});

export const selectCharacters = (state) => state.character.characters;
export const selectCharacterStatus = (state) => state.character.status;
export const selectCharacterError = (state) => state.character.error;

export default characterSlice.reducer;