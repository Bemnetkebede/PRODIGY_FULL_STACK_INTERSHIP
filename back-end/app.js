const express = require('express');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');
const { connect } = require('./db/dbConfige')
const app = express();





app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connect
app.use('/api', userRoutes)



const dbconnection = require('./db/dbConfige')
async function  strat(){
    try{
        const result = await dbconnection.execute("select 'test'")
        app.listen(5000)
        console.log('db succesfully connected')
        console.log('server is listening on port 5000')
    }
    catch(err){
        console.log(err.message)
    }
}
strat()

