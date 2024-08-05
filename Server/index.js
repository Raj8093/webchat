import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { client } from './db.js';
import { generateUserId } from './utils/uniqueUid.js';
const PORT=8080 
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
res.status(200).send('response found')
})

app.post('/signup',async(req,res)=>{
    const {name,password,email}=req.body
    
    
    try {
        await client.connect();

        // Create the users table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                user_id TEXT UNIQUE NOT NULL,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        `;
        await client.query(createTableQuery);
        console.log('Table created successfully');

        // Insert data into the users table after checking exsisting email
        if(email){
            let fetchedData= await client.query(`select * from users where email='${email}'`)
            if(!fetchedData.rows.length){
                let userId=generateUserId('u')
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertDataQuery = `
                    INSERT INTO users (user_id,name, email, password) VALUES
                    ('${userId}','${name}', '${email}', '${hashedPassword}');
                `;
        
                const newUser=await client.query(insertDataQuery);
                console.log('Data inserted successfully',name,userId,email,password);
                res.status(200).json({message:'Login Successful'})
            }
            else{
                res.status(400).json({message:'Email Already Exsists.'})
            }
        }

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send(`some error happened`)
    } finally {
        await client.end();
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    await client.connect();
    try {
      const result = await client.query(
        `SELECT EXISTS (
           SELECT FROM pg_tables 
           WHERE schemaname = 'public' 
           AND tablename = $1
         )`,
        ['users']
      );
      console.log(email,password,"result--->",result.rows[0].exists)
    //   return res.rows[0].exists;
    if(result.rows[0].exists){
        let fetchedData= await client.query(`select * from users where email='${email}'`)
            if(fetchedData.rows.length){
                console.log('userdata===>',fetchedData.rows[0])
                bcrypt.compare(password, fetchedData.rows[0].password, (err, result) => {
                    if (err) {
                      console.error('Error comparing passwords', err);
                      return;
                    }
                    if (result) {
                      res.status(200).json({message:'login Succesful.'})
                    } else {
                        res.status(401).json({message:'login failed.'})
                    }
                  });
            }
            else{
                res.status(401).json({message:'Email not found.'})
            }
    }
    } catch (err) {
      console.error('Error executing query', err.stack);
      throw err;
    } finally {
    //   await client.end();
    }
})
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}; `)
})
