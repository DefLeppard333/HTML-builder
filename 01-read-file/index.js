const fs = require('fs');
 
//! readFile

// fs.readFile("01-read-file/text.txt", "utf8", 
//             function(error,data){
//                 if(error) throw error; 
//                 console.log(data);  
// });


//!  readStream

const stream = fs.createReadStream('01-read-file/text.txt','utf8');
stream.on('data', (data) => console.log(data));
stream.on('error', (err) => console.log(`Err: ${err}`));