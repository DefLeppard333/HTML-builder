const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, err=>err);
let copyFolderDir = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(copyFolderDir, {recursive:true}, err=>err);

const html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
const templateHtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
templateHtml.pipe(html);

const css = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

const copyAssets  = (dir, folder)=>{
  fs.readdir(dir, {withFileTypes: true}, (err, files)=>{
    if(err) return err;
    files.forEach(item=>{
      if(item.isFile()){
        fs.copyFile(dir + '/' + item.name, copyFolderDir + '/' + folder + '/' + item.name, err=>err);
      }else{
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item.name), {recursive:true}, err=>err);
        copyAssets(dir + '/' + item.name, item.name);
      }
    });
  });
};
copyAssets(path.join(__dirname, 'assets'));

function copyStyle(dir){
  fs.readdir(dir, {withFileTypes: true}, (err, files)=>{
    if(err) throw err;
    files.forEach(item=>{
      if(item.isFile()){
        pipingStyle(item.name);
      }
    });
  });
}
copyStyle(path.join(__dirname, 'styles'));

function pipingStyle(file){
  const rs = fs.createReadStream(path.join(__dirname, 'styles', file));
  rs.pipe(css);
  rs.on('error', err=> console.log(err));
}

function saveToIndex (str)  {
  const html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  html.write(str);
}
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data)=>{
  if(err)console.log(err);
  let template = data;
  const allTemplateTags = data.match(/{{(.*?)}}/g).map( function(val) {
    return val;
  });

  allTemplateTags.forEach(item => {
    const compName = item.replace('{{', '').replace('}}', '');
    
    fs.readFile(path.join(__dirname, 'components', `${compName}.html` ), 'utf-8', (err, data)=>{
      if(err)console.log(err);
            
      template = template.replace(item, data);
      saveToIndex(template);
    }); 
  });
});