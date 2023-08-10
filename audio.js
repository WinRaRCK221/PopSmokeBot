const ffmpeg = require('fluent-ffmpeg');
const fs = require('node:fs');
const path = require('node:path')


function getClip() {

    removeClip();

    const folderPath = path.join(__dirname, 'SmokeSongs');
    const commandFolders = fs.readdirSync(folderPath);
    
    const file = commandFolders[Math.floor(Math.random()*commandFolders.length)];

    const input_file = folderPath +"/"+ file;
    const output_file = 'temp.mp3';

    ffmpeg.ffprobe(input_file, (err, metadata) => {
        if(err) {
            console.error('Fucked: ',err);
            return;
        }
        const length = Math.floor(Math.random() * parseFloat(metadata.format.duration)-10);

        ffmpeg()
            .input(input_file)
            .setStartTime(length)
            .setDuration(10)
            .audioCodec('copy')
            .output(output_file)
            .on('end', () => {
                console.log("finished");
            })
            .on('error',() => {
                console.log("error");
            })
            .run()
    })
    return file.replace('.mp3','');
}


function removeClip() {
    try {
        fs.unlink("temp.mp3")
    } finally {
        return;
    }
}

module.exports = { getClip };