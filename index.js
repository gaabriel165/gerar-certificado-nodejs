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

//Config data
var moment = require("moment");
moment.locale("pt-br");
const dataAtual = moment().format("LL");

//Validar erros
const { body, validationResult } = require('express-validator');

app.post("/certificado", [

    body("template").isLength({min: 10}).withMessage("A url do template precisa conter pelo menos 10 caracteres!"),
    body("nome").isLength({min: 4}).withMessage("O nome deve conter pelo menos 4 caracteres!"),
    body("curso").isLength({min: 4}).withMessage("O curso deve conter pelo menos 4 caracteres!")
] ,async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    var data = {
        nome: req.body.nome,
        curso: req.body.curso,
        data: dataAtual
    }

    axios.get(req.body.template).then((res) => {

        var template = handlebars.compile(res.data);
        var html = template(data);

        (async () => {
            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
            });
            const page = await browser.newPage();

            await page.setContent(html);
            const pdf = await page.pdf({path: 'certificado.pdf', format: 'A4'});

            await browser.close();
        })();
    });
    res.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Successful connection!")
});