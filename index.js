require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const gist = require('./app/routes/gist');
const user = require('./app/routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cors());
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
.then( db =>{
    console.log('mongodb connected');
}).catch(error=>{
    console.log('mongodb not connected', error);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

user(app);
gist(app);

app.listen(port, ()=> console.log(`Gist API is listening on port ${port}`));
