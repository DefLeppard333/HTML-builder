const fs = require("fs");
 

fs.readFile("01-read-file/text.txt", "utf8", 
            function(error,data){
                if(error) throw error; 
                console.log(data);  
});