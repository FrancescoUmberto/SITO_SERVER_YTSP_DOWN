import fs from 'fs'
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import searchSong from './youtubeScripts.js';

function ytDownload() {
  fs.writeFile('link.json', JSON.stringify(document.getElementById('linkYoutube')), err => {
    if (err) {
      console.log(err);
    }
  });
}
const outputFilePath = '/Users/umbertofrancescocarolini/Desktop/Programmazione/SITO_SERVER_YTSP_DOWN/';
export async function downloadBySongName(songName) {
  console.log(`Link YT: ${songLink}`);
  res.attachment(songNameOriginal + '.mp3');
  const stream = ytdl(songLink, { filter: "audioonly", quality: "highestaudio" })
  const outputFilePathDown = outputFilePath + songNameOriginal + '.mp3';
  ffmpeg(stream)
    .audioCodec('libmp3lame')
    .format('mp3')
    .output(outputFilePathDown)
    .on('end', () => {
      console.log('Download and conversion completed!');
    })
    .on('error', (err) => console.error(err))
    .save(outputFilePathDown)
    return outputFilePathDown;  
}

//function ytDownload() {
//if (formatValue == '') {
//alert('Scegliere formato');
//return;
//}
//const linkDown = document.getElementById("linkYoutube").value;
//console.log(linkDown);
//document.download(ytdl(linkDown).pipe(fs.createWriteStream('video.mp4')));
//const download = ytdl(linkDown, {quality: 'highest'});
//download.pipe(fs.createWriteStream('video.flv'));
//return;
//}
function setValue(clicked_id) {
  let formatValue = '';
  formatValue = clicked_id;
  console.log(formatValue);
  return;
};
