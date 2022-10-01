const express = require('express');
const axios = require('axios')
const path = require('path');
const fs = require("fs"); 
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(path.resolve(__dirname, '..', 'build'),
{ maxAge: '30d' },
));

// app.get('/*', (request, response) => {
//     const filePath = path.resolve(__dirname,'build', 'index.html');

//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err){
//             console.error('error reading path', err)
//             return console.log(err);
//         }

//         // console.log("success")
//         data = data.replace('__META_TITLE__', 'Inspiredformen123.com');
//         data = data.replace('__META_OG_TITLE__', 'This is inspired og title')
//         data = data.replace('__META_DESCRIPTION__', 'This is inspired for men websitedescription')
//         data = data.replace('__META_OG_DESCRIPTION__', 'This is inspired for men website111 og description')
//         response.send(data)
//     });
// });


app.get('/*', (request, response) => {
    const filePath = path.resolve(__dirname,  './build', 'index.html');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('error reading path2222', err);
            return console.log(err);
        }

        console.log("success for each posts")
        // let apiUrl = `http://localhost:5000${request.url}/select?seokey=topic, category`
        let apiUrl = 'https://inspiredformen.herokuapp.com/posts'
        axios.get(apiUrl).then((resdata) => {
            console.log("resdata", resdata)
            const {topic, category} = resdata.data
            data = data.replace('__META_TITLE__', topic);
            data = data.replace('__META_OG_TITLE__', topic);
            data = data.replace('__META_DESCRIPTION__', topic)
            data = data.replace('__META_OG_DESCRIPTION__', category);
            response.send(data)
        })
    })
})



// app.get('*', function(request, response){
//     const filePath = path.resolve(__dirname, './build', 'index.html');
//     response.sendFile(filePath);
// })

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))




