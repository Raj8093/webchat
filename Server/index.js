import express from 'express';
const PORT=8080 
const app=express();

app.get('/',(req,res)=>{
res.status(200).send('response found')
})

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}; `)
})
