import express from 'express';
const app = express();
import server, { get } from 'http';
server.createServer(app);
import path from 'path';
import fs from 'fs';
import ytdl from 'ytdl-core'
const router = express.Router();
import axios from 'axios';
const host = 'localhost';
const port = 5500;
import { fileURLToPath } from 'url';
import getAccessToken from './Scripts/spotifyScripts.js';
import { getSongName } from './Scripts/spotifyScripts.js';
import { getSongArtist } from './Scripts/spotifyScripts.js';
import { searchSong } from './Scripts/youtubeScripts.js';





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientId = '331613cbcbb046d480cef166acd56e8c';
const redirectUri = 'http://localhost:5500/callback';

app.use(express.json()); //Accept data in json format
app.use(express.urlencoded()); //Decode the data send through html form
app.use(express.static('public'));
app.use(express.static(path.join('public')));


app.get((req, res) => {
    res.sendFile('/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/public/index.html');
});
//YT downloader
app.post('/formYt', async (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'download.mp4');
    res.setHeader('Content-type', 'application/octet-stream');
    //Get the song's link of the request
    const link = req.body.link;
    //Get the song name by checking the link
    const songName = (await ytdl.getInfo(link)).videoDetails.title;
    res.attachment(songName + '.mp4')
    //Download the song
    ytdl(link, { filter: "audioonly" }).pipe(res)
});
//SP downloader
app.post('/formSp', async (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'download.mp4');
    res.setHeader('Content-type', 'application/octet-stream');
    //Get the song's link of the request
    const link = req.body.link;
    // const songName = await getSongName(link);
    getAccessToken();
    const songName = await getSongName(link);
    const songArtist = await getSongArtist(link);
    var songToSearch = songName + ' ' + songArtist + ' original video';
    const songLink = await searchSong(songToSearch);
    console.log(`Link YT: ${songLink}`);
    res.attachment(songToSearch + '.mp4');
    ytdl(songLink, { filter: "audioonly" }).pipe(res);
});
//SONG NAME downloader
app.post('/downloadBySongName', async (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'download.mp4');
    res.setHeader('Content-type', 'application/octet-stream');
    //Get the song's link of the request
    const songName = req.body.songName;
    var songToSearch = songName  + ' original video';
    const songLink = await searchSong(songToSearch);
    console.log(`Link YT: ${songLink}`);
    res.attachment(songToSearch + '.mp4');
    ytdl(songLink, { filter: "audioonly" }).pipe(res);
});







app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});