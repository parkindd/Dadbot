var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with 'im' or variants
    if (user != 'Dadbot') {
	var regex = /(im|Im|IM|I\'m|I\'M|i\'m|I\’m|I\’M|i\’m) (\w+)/;
    var match = regex.exec(message);
    if (match && user != 'Dadbot') {
		var name = match[2];
		if (name != undefined) {
			bot.sendMessage({
				to: channelID,
				message: 'Hi ' + name + ', I\'m Dad!'
			});
		}
				// Just add any case commands if you want to..
	}
	}
});