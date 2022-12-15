require('dotenv').config();
const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

module.exports = { bot };