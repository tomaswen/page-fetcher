const fs = require('fs')
const request = require('request');
const readline = require('readline');

const args = process.argv.slice(2)
const URL = args[0];
const specifiedPath = args[1];
let data = ''

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(URL, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); 
  if(fs.existsSync(specifiedPath)){
    rl.question('File exist do you want to continue?: ', (answer) => {
      if (answer === 'y' || answer === 'Y'){
        fs.writeFile(specifiedPath,body, (err) => {
          if (err) throw err;
          else {
            let stats = fs.statSync(specifiedPath);
            console.log(`Downloaded and saved ${stats['size']} bytes to ./index.html`)
          }
        })
        
      }
      else {
        console.log('ok')
      }
      rl.close();
    })
  }
  else {
    fs.writeFile(specifiedPath,body, (err) => {
      if (err) throw err;
      else {
        let stats = fs.statSync(specifiedPath);
        console.log(`Downloaded and saved ${stats['size']} bytes to ./index.html`)
      }
    })
  }
});
