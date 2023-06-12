import fs from 'fs'

function ytDownload() {
  fs.writeFile('link.json', JSON.stringify(document.getElementById('linkYoutube')), err =>{
      if (err){
          console.log(err);
      }
  });
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
