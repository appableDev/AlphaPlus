/**
 * Created by zenymax on 2/28/17.
 */
import fs from 'fs'
import cheerio from 'cheerio'
import colors from 'colors'

/*eslint-disable no-console*/

fs.readFile('src/index.html', 'utf8', (err, markup)=>{
  if(err) {
    return console.log('Error read index.html from source: '.red, err)
  }
  const $ = cheerio.load(markup)

  $('head').prepend('<link rel="stylesheet" href="styles.css">')


  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
  }
  fs.writeFile('dist/index.html', $.html(), 'utf8', (err)=>{
    if (err) {
      return console.log('Error write index.html to dist: '.red, err);
    }
    console.log('index.html is ready for serving'.green);
  })
})
