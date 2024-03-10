
// importing dependencies
/*
body-parser: You will use this dependency to convert the body of incoming requests into JavaScript objects.
cors: You will use this dependency to configure Express to add headers stating that your API accepts requests coming from other origins. This is known as Cross-Origin Resource Sharing (CORS).
express: This is the Express library itself.
helmet: This library helps to secure Express APIs by defining various HTTP headers.
morgan: This library adds some logging capabilities to your Express API.
*/
const exress = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// defining the Express app
const app = exress();

//defining an array to work as the temp db

const db_temp =  [
    {title: 'Boilerplate node express setup'}
]

// db_temp.forEach( (element) => {
//     console.log(element);
// })

// adding helmet to enhance api's security
app.use(helmet());

app.use(bodyParser.json());

app.use(morgan('combined'));


//defining the endoint to return all request 
app.get('/', (req, res) => {
    res.send(db_temp);
});


// starting the server
app.listen(3008, () => {
    console.log('listening on port 3008')
});
