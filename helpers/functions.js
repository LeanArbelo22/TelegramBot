const fs = require('fs');
const axios = require('axios');
const { openai } = require('../services/openai');

const simpleCommandMessages = (command, context, replies) => {
    try {
        context.reply(replies);

        if(command === 'random') {
            console.log(`Sended ${command} number`);
        } else {
            console.log(`Sended ${command} message`);
        }
        
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    } 
}

const getInteger = (command, context) => {
    const fullText = context.update.message.text;
    const number = Number(fullText.split(' ')[1]);
    const integer = command.random(number);
    return integer;
}

const randomNumber = (number) => {
    return Math.floor(Math.random() * number + 1)
}

const sendRandomNumber = (context, customCommands) => {
    try {
        const integer = getInteger(customCommands, context);

        if (isNaN(integer) || integer <= 0) {
            context.reply(customCommands.errorRandom);
        } else {
            const integerString = integer.toString();
            simpleCommandMessages('random', context, `Here is a random number for you: \n\n${integerString}`);
        }

    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

const sendRandomPhoto = (context) => {
    const random = randomNumber(5);
    const src = `images/file_${random}.jpg`; 

    try {
        context.replyWithPhoto({ source: src });
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

const downloadImage = (url, localPath, context) => {
    axios({ url, responseType: 'stream' })
    .then(response => {
        new Promise((resolve, reject) => {
            response.data
            .pipe(fs.createWriteStream(localPath))
            .on('finish', () => {
                context.reply(`Image saved succesfully`);
                console.log(`Image saved`);
                resolve();
            })
            .on('error', (error) => {
                context.reply(`Image couldn't be saved`);
                console.log(`Image not saved: ${error}`);
                reject(error);
            });
        });
    });
}

const getPhoto = (context) => {
    try {
        const photoId = context.update.message.photo[3].file_id;
        // telegram provides an array of photos with different sizes, the last is the most similar to the original and his fileID is used by the getFileLink method
        context.telegram.getFileLink(photoId)
        .then(response => {
            const url = response.href;
            const pathname = response.pathname.split('/');
            const name = pathname[pathname.length - 1];
            downloadImage(url, `./images/${name}`, context);
        });

    } catch (error) {
        console.log(`An error occurred: ${error}`);
    }
}

const askToChat = async (messageRequest) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: messageRequest,
        temperature: 0.4,
        stream: false,
        max_tokens: 300
    });

    return completion.data.choices[0].text;
}

const botReply = async (context, customCommands) => {
    try {
        const ctxMessage = context.update.message.text;
        let messageArr = ctxMessage.split(' ');
        messageArr.splice(0, 1);
        let message = messageArr.join(' ');

        if (!message) {
            context.reply(customCommands.errorBot);
        } else {
            let answer = await askToChat(message);
            await context.reply(answer);
        }

    } catch (error) {
        console.log(`An error occurred: ${error}`);
    }
}

module.exports = { simpleCommandMessages, getInteger, randomNumber, sendRandomNumber, sendRandomPhoto, downloadImage, getPhoto, botReply };