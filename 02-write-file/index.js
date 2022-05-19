const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

function fileHandler(){

  const stream = fs.createWriteStream(path.join(__dirname, '02-write-file.txt'), 'utf-8');
  stdout.write('type some text\n');
  stdin.on('data', data => {
    if (data.toString().trim() === 'exit') process.exit();
    stream.write(data);
  });
  process.on('exit', () => {
    stdout.write('\n bye \n');
  });
  process.on('SIGINT', () => process.exit());
}




fileHandler();

