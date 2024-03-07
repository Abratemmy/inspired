const path = require('path');
const express = require('express');
const axios = require('axios')
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("success")
        data = data.replace('__META_TITLE__', 'Inspiredformen.com');
        data = data.replace('__META_OG_TITLE__', 'IMPACTING LIFE, FULFILLING DESTINY');
        data = data.replace('__META_DESCRIPTION__', 'IMPACTING LIFE, FULFILLING DESTINY');
        data = data.replace('__META_OG_DESCRIPTION__', 'IMPACTING LIFE, FULFILLING DESTINY');
        data = data.replace('__META_KEYWORDS__', "IMPACTING LIFE, FULFILLING DESTINY")
        response.send(data)
    });
})


app.get('/:topic', (request, response) => {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        console.log("success for each posts")
        // let apiUrl = `http://localhost:5000${request.url}/select?seokey=topic, category`
        let apiUrl = `https://inspiredformenserver.onrender.com/posts${request.url}?seokey=topic, category`
        axios.get(apiUrl).then((resdata) => {
            console.log("resdata", resdata?.data)
            // const { topic, category } = resdata?.data
            const topic = resdata?.data

            // let kwrds = JSON.parse(topic)
            data = data.replace('__META_TITLE__', topic);
            data = data.replace('__META_OG_TITLE__', topic);
            data = data.replace('__META_DESCRIPTION__', " ")
            data = data.replace('__META_OG_DESCRIPTION__', " ");
            data = data.replace('__META_KEYWORDS__', "IMPACTING LIFE, FULFILLING DESTINY")
            response.send(data)
        })
    })
})

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))




