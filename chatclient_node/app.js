let express = require('express');
let path = require('path');
let fs = require('fs');
let app = new express();
app.use(express.static(path.resolve(__dirname,"./build")));
app.get('*',(req,res)=>{
    const html = fs.readFileSync(path.resolve(__dirname,"./build/index.html"),"utf-8");
    res.send(html);
})
app.listen(3200);