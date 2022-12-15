const { bot } = require('./services/telegram');
const { defaultCommands, customCommands } = require('./helpers/commands');
const { simpleCommandMessages, sendRandomNumber, getPhoto,
        sendRandomPhoto, botReply } = require('./helpers/functions');

bot.start(context => {
    simpleCommandMessages('start', context, defaultCommands.start);
});

bot.help(context => {
    simpleCommandMessages('help', context, defaultCommands.help);
});

bot.command('social', context => {
    simpleCommandMessages('social', context, customCommands.social);
});

bot.command('random', context => {
    sendRandomNumber(context, customCommands);
});

bot.command('sendphoto', context => {
    sendRandomPhoto(context);
});

bot.command('bot', context => {
    botReply(context, customCommands);
});

bot.command('cv', context => {
    context.replyWithDocument({ source: './images/CV-LeandroArbelo.pdf' });
})

bot.on('photo', context => {
    getPhoto(context);
});

bot.hears('Quien es Leandro Arbelo?', context => context.reply('Un desarrollador web full stack, actualmente estudiante de Desarrollo de Software'));

bot.launch();
