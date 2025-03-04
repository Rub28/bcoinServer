const express  =  require('express');  
const cors = require ('cors'); 
const connection = require('./database'); 
const  app = express(); 
const port = 3000;  

app.use (cors());  
app.use(express.json()); 

app.get('/usuarios', (req,res)  => {
    connection.query (' Select  * from users', (err, results) => {
        if(err) {
            res.status(500).send(' Error en Base da datos', err); 
            return; 
        }
        res.json(results); 
        
    }); 

});   


app.listen(port, () => { 
        console.log(`Serividor activo en;  ${port}`); 
        console.log(res); 
}); 