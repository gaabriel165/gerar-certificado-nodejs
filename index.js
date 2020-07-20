const express = require("express");
const app = express();

//Config handlebars
const handlebars = require("handlebars");

//Config axios
const axios = require("axios");

//Config body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config puppeteer
const puppeteer = require('puppeteer');
const { abort } = require("process");
const { request } = require("http");

app.post("/certificado", async (req, res) => {

    var data = {
        nome: req.body.nome,
        curso: req.body.curso,
        data: req.body.data
    }

    axios.get(req.body.template).then((res) => {

        var template = handlebars.compile(res.data);
        var html = template(data);

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(html);
            await page.pdf({path: 'certificado.pdf', format: 'A4'});
        
            await browser.close();
        })();
    });
    res.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Successful connection!")
});