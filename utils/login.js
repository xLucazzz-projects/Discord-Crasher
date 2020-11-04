const axios = require('axios')
const colors = require('colors')
const raid = require('./raid')

async function login(email, senha, id) {
    await axios.post(`https://discord.com/api/v8/auth/login`, { "login": `${email}`, "password": `${senha}` }, {
        headers: {
            "content-type": "application/json"
        }
    }).then(response => {
        if (response.data.token) {
            raid(response.data.token, id)
        } else {
            console.log(colors.red(`[LOGIN] Foi recebida uma resposta não identificada`))
        }
    }).catch(err => {
        console.log(colors.red(`[LOGIN] Não foi possível autenticar. Error: ${err}`))
    })
}

module.exports = login;