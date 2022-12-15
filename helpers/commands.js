const { randomNumber } = require('./functions');

const defaultCommands = {
    start: `Hi there! This is a bot developed by Leandro Arbelo. \nIf you want to see what is possible to do with this bot press the following command: \n# /help`,
    help: `Available commands: \n\n# /cv: To download my curriculum \n\n# /social: Show my social networks to see other projects or contact me. \n\n# /random <N>: This command returns a random number, to make it work you have to specify an integer ("<N>") to set a maximum, example: "/random 100". \n\n# /bot <Q>: This command is connected to the ChatGPT-3 API, you could use it as is the same as the web version, to make it work you have to use "/bot <Your question or whatever you want to say it>" and the bot will answer as soon the reply is generated. \n\n# /sendphoto: Try it to recieve a random meme \n\nHope you enjoy it!`
}

const customCommands = {
    social: `See my portfolio at: \nhttps://portfolio2023-bay.vercel.app/ \n\nVisit my github page: \nhttps://github.com/LeanArbelo22 \n\nOr contact me via LinkedIn: \nhttps://www.linkedin.com/in/leandro-arbelo/`,
    random: (num) => randomNumber(num),
    errorRandom: `Try again using /random N (N has to be a number > 0)`,
    errorBot: `Try again using /bot Q (Q is whatever you want to say or ask to the bot)`
}

module.exports = { defaultCommands, customCommands };