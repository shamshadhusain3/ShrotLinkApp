const express=require('express');
const app=express();
const routes=require('./routes/routes');



app.use(express.urlencoded({extended:true}))
app.use(express.json())

<<<<<<< HEAD
app.use('https://shortlinkapp.onrender.com/',routes)
=======
app.use('https://shortlinkapp.onrender.com/',routes)
>>>>>>> 03769d2e51afe9fc7a9f4f6690f6c9abf642c75d

app.set('view engine','ejs')





app.listen(3000,()=>{
    console.log('server running')
})
