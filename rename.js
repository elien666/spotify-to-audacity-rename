const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

const CSV = 'demo.csv'
const FOLDER =  'SET_PATH'
const INCLUDE_ALBUM = false

const fullPath = file => `${FOLDER}${path.sep}${file}`

const safeEncode = text => (
    text.replace('/', '&')
)

const results = []

fs.createReadStream(CSV)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results[data['track']] = [ data['artist'], data['title'], data['album'] ])
  .on('end', () => {

    const folderPath = FOLDER
    
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err)
        return;
      }
    
      // 'files' is an array containing the names of files and subdirectories in the folder
      files.filter(file => file.startsWith('Sound')).forEach((file, index) => {
        //const track = parseInt(file.substring(6,9))
        const track = index + 1
        const data = results[track]
        const newName = INCLUDE_ALBUM 
          ? `${safeEncode(data[2])} ${track} ${safeEncode(data[0])} - ${safeEncode(data[1])}.mp3`
          : `${track} ${safeEncode(data[0])} - ${safeEncode(data[1])}.mp3`
        fs.rename(fullPath(file), fullPath(newName), (err) => {
            if (err) {
              console.error('Error renaming the file:', err)
            } else {
              console.log('File renamed successfully.')
            }
          });
        console.log(file, ' => ', newName)
      })
    })
    
    
  })