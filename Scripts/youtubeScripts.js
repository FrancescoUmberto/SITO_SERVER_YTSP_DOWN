
import ffmetadata from 'ffmetadata';
import axios from "axios";



export async function linkValidator(link) {
    const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?=.*v=\w+)(?:\S+)?$/;
    if (link.match(youtubeRegex)) {
        console.log('youtube');
    }
    else {
        throw new Error("Invalid link");
    }
}

export async function searchSong(songName) {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            params: {
                key: 'AIzaSyDfKgCGZ1v8dY-3OHK-daBqUit2rriSwto',
                q: songName,
                part: 'snippet',
                type: 'video',
                maxResults: 1
            }
        });
        const videoId = response.data.items[0].id.videoId;
        var songLink = `https://www.youtube.com/watch?v=${videoId}`;
        console.log(songLink);
    } catch (error) {
        console.log(error);
    }
    return songLink;
}

//Function still not used/ended
function ytDownload(link) {
    fs.readFile('/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/link.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        let links = JSON.parse(data);
        links.push(link);
        fs.writeFile('/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/link.json', JSON.stringify(links), function (err) {
            if (err) {
                console.log(err);
            }
        })
    })
};

// export async function searchSongLink(songName){
//     try{
//         const searchResults = await ytdl.(songName);

//         const firstResult = searchResults[0];
//         if (firstResult){
//             return firstResult.link;
//         }
//         else{
//             throw new Error("No results found");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

export default searchSong;










// import google from 'googleapis';
// var OAuth2 = google.auth.OAuth2;

// import { GoogleAuth } from 'google-auth-library';
// //set the auth
// const auth = new GoogleAuth({
//     keyFile: 'AIzaSyDfKgCGZ1v8dY-3OHK-daBqUit2rriSwto',
//     scopes: 'https://www.googleapis.com/auth/youtube.readonly',
// });
// //Create a yt api
// const youtube = google.youtube({
//     version: 'v3',
//     auth: auth,
// });

// export async function getYouTubeLink(songName){
//     try{
//         const response = await youtube.search.list({
//             part: 'snippet',
//             q: songName,
//             type: 'video',
//             maxResults: 1,
//         });
//         const videoId = response.data.items[0].id.videoId;
//         const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
//         return youtubeLink;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
