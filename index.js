import express from 'express';
const app = express();
import server from 'http';
server.createServer(app);
import path from 'path';
import fs from 'fs';
import ytdl from 'ytdl-core'
import spdl from 'spdl-core';
const router = express.Router();
const host = 'localhost';
const port = 5500;
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); //Accept data in json format
app.use(express.urlencoded()); //Decode the data send through html form
app.use(express.static('public'));
app.use(express.static(path.join('public')));

//Function still not used/ended
function ytDownload(link) {
    fs.readFile('/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/link.json', function (err, data) {
        var json = JSON.parse(data);
        json.push('search result: ' + link);

        fs.writeFile("/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/link.json", JSON.stringify(json))
    })
    
};
app.get((req, res) => {
    res.sendFile('/Users/umbertofrancescocarolini/Desktop/PROGRAMMAZIONE/SITO_SERVER_YTSP_DOWN/public/index.html');
});

app.post('/formYt', async(req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'download.mp4');
    res.setHeader('Content-type', 'application/octet-stream');
    //Get the song's link of the request
    const link = req.body.link;
    //Get the song name by checking the link
    const songName = (await ytdl.getInfo(link)).videoDetails.title;
    res.attachment(songName+'.mp4')
    ytdl(link, {filter:"audioonly"}).pipe(res)
});

app.post('/formSp', async(req, res)=>{
    res.setHeader('Content-disposition', 'attachment; filename=' + 'download.mp4');
    res.setHeader('Content-type', 'application/octet-stream');
    const link = req.body.link;
    const songName = (await spdl.getInfo(link)).videoDetails.title;
    console.log(songName);

})

app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});
