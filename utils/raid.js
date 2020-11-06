const axios = require('axios')
const colors = require('colors')

var mensagens = 0


async function raid(token, id, delay) {
    var emojis = ["\uD83D\uDE01", "\uD83D\uDE03", "\uD83D\uDE04", "\uD83D\uDE05", "\uD83D\uDE06", "\uD83D\uDE09", "\uD83D\uDE0A", "\uD83D\uDE0B", "\uD83D\uDE0C", "\uD83D\uDE0D", "\uD83D\uDE0F", "\uD83D\uDE12", "\uD83D\uDE13", "\uD83D\uDE14", "\uD83D\uDE16", "\uD83D\uDE18", "\uD83D\uDE1A", "\uD83D\uDE1C", "\uD83D\uDE1D", "\uD83D\uDE1E", "\uD83D\uDE20", "\uD83D\uDE21", "\uD83D\uDE22", "\uD83D\uDE23", "\uD83D\uDE24", "\uD83D\uDC17", "\uD83D\uDC18", "\uD83D\uDC19", "\uD83D\uDC11", "\uD83D\uDC0E", "\uD83D\uDC0D", "\uD83D\uDC0C", "\uD83C\uDFF0"]
    var message = `**`
    for (i = 0; i < 1995; i++) {
        if (i === 1994) {
            message += `${emojis[Math.floor(Math.random() * emojis.length)]}**`
        } else {
            message += `${emojis[Math.floor(Math.random() * emojis.length)]}`
        }
    }
    
    await axios.post(`https://discord.com/api/v8/channels/${id}/messages`, { "content": `${message}` }, {
        headers: {
            "authorization": `${token}`
        }
    }).then(async response => {
        if (response.data.id) {
            mensagens++
            console.log(colors.green(`[+] `) + `${mensagens} mensagens enviadas!` + colors.yellow(` [Awaiting ${delay}ms]`))
            await sleep(delay)
            raid(token, id, delay)
        } else {
            console.log(colors.red(`[-] `) + `Ocorreu um erro desconhecido ao enviar a mensagem`)
        }
    }).catch(err => {
        if (err.response.status === 429) {
            console.log(colors.red(`[RATE LIMIT] Awaiting ${err.response.data.retry_after.toString().replace('.', '')}ms`))
            setTimeout(() => {
                raid(token, id, delay)
            }, err.response.data.retry_after.toString().replace('.', ''));
        } else {
            console.log(colors.red(`[SPAMMER] Ocorreu um erro ao enviar a mensagem. Error: ${err}`))
        }
    })

}

async function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), duration);
    });
}

module.exports = raid;
