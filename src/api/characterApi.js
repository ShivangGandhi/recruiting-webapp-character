import axios from "axios";

const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{ShivangGandhi}/character';


export const fetchCharacters = async () => {
    const response = await axios.get(`${API_URL}`);
    console.log("Fetched data: ", response);
    return response.data.body;
};

export const saveCharacters = async (characters) => {
    console.log("Sent chars: ", characters);
    const response = await axios.post(`${API_URL}`, characters, {
        headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
};
