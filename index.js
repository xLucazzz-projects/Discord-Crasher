const colors = require('colors')
const readline = require('readline')
const raid = require('./utils/raid')
const login = require('./utils/login')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


email()

async function email() {
    console.clear()
    console.log(colors.red(`
     ▄████▄   ██▀███   ▄▄▄        ██████  ██░ ██ ▓█████  ██▀███  
    ▒██▀ ▀█  ▓██ ▒ ██▒▒████▄    ▒██    ▒ ▓██░ ██▒▓█   ▀ ▓██ ▒ ██▒
    ▒▓█    ▄ ▓██ ░▄█ ▒▒██  ▀█▄  ░ ▓██▄   ▒██▀▀██░▒███   ▓██ ░▄█ ▒
    ▒▓▓▄ ▄██▒▒██▀▀█▄  ░██▄▄▄▄██   ▒   ██▒░▓█ ░██ ▒▓█  ▄ ▒██▀▀█▄  
    ▒ ▓███▀ ░░██▓ ▒██▒ ▓█   ▓██▒▒██████▒▒░▓█▒░██▓░▒████▒░██▓ ▒██▒
    ░ ░▒ ▒  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░
      ░  ▒     ░▒ ░ ▒░  ▒   ▒▒ ░░ ░▒  ░ ░ ▒ ░▒░ ░ ░ ░  ░  ░▒ ░ ▒░
    ░          ░░   ░   ░   ▒   ░  ░  ░   ░  ░░ ░   ░     ░░   ░ 
    ░ ░         ░           ░  ░      ░   ░  ░  ░   ░  ░   ░     
    ░                                                            \n`))
    rl.question(colors.green(`[1] `) + `Email: `, async (answer) => {
        if (!answer) {
            return email()
        }
        senha(answer)
    })
}

async function senha(email) {
    rl.question(colors.red(`[2] `) + `Senha: `, async (answer) => {
        if (!answer) {
            return senha(email)
        }
        id(email, answer)
    })
}

async function id(email, senha) {
    rl.question(colors.magenta(`[3] `) + `Id do Canal: `, async (answer) => {
        if (!answer) {
            return id(email, senha)
        }
        delay(email, senha, answer)
    })
}

async function delay(email, senha, id) {
    rl.question(colors.cyan(`[4] `) + `Delay (ms): `, async (answer) => {
        if(!answer) {
            return delay(email, senha, id)
        }

        login(email, senha, id, answer)
    })
}
