import axios from "axios";




const clientId = '331613cbcbb046d480cef166acd56e8c';
const clientSecret = '04984055c5b74d71b814f5c469426af9';
const redirectUri = 'http://localhost:5500';


export async function getAccessToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
        });
        const accessToken = response.data.access_token;
        console.log(`Access Token: ${accessToken}`);
        return accessToken;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
//function to get the song name frome the spotify's link
export async function getSongName(link) {
    const songId = link.split('/')[4];
    const accessToken = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const songName = response.data.name;
    console.log(songName);
    return songName;
};
export async function getSongArtist(link) {
    try {
        const regex = /track\/(.+)/;
        const match = link.match(regex);
        if (match && match[1]) {
            const trackId = match[1];
            const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${await getAccessToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            const artistName = response.data.artists[0].name;
            console.log(artistName);
            return artistName;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getAccessToken;



