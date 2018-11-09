const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const { token, prefix, scope } = require("./config.json");
const fs = require('fs');
const readline = require('linebyline');
const {google} = require('googleapis');

client.on("ready", () => console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`));
// Example of changing the bot's playing game to something useful. `client.user` is what the
// docs refer to as the "ClientUser".
//client.user.setActivity(`Serving ${client.guilds.size} servers`);

// checks command and calls proper function
client.on("message", (message) => {
	if (message.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (message.content.startsWith(prefix)) {
    	// idk strange split command
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		let command = args.shift().toLowerCase();
		console.log("args = " + args);
		console.log("command = " + command);
		message.channel.send("args = " + args);
		message.channel.send("command = " + command);
        
        //if (command.)
        processCommand(message);
    }
})
/*
	THIS IS SAME AS ABOVE
	// Prevent bot from responding to its own messages
	if(message.author.bot) return;

	if(message.content.indexOf(prefix) !== 0) return;
	//  [same as above] would check if it's not prefix then ignore (should be first if used and break out of bot)
	//if(!message.content.startsWith(prefix)) return;
 */
//start function - to be split between functions
function processCommand(message) {
	// reply
	if(message.content.startsWith(prefix + "git")){
		message.channel.send("\ngay\nand gud\n\nPraise the Hippo\nchode 4 lyfe");
		return;
	}
	if(message.content.startsWith(prefix + "sheet")){
		message.channel.send("spreadsheetCommand ACTIVATED");
		spreadsheetCommand(message);
		return;
	}
	//message.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content);
};

//let scdbgay = ['https://docs.google.com/spreadsheets/d/1PGPH8oWvZyplPGdZNB1p_0h_RwCp3oCABWDMzGblZf4/edit#gid=998208401'];

function spreadsheetCommand(message) {
	// added via https://github.com/gsuitedevs/node-samples/blob/master/sheets/quickstart/index.js

	message.channel.send("spreadsheetCommand RUNNING");

	// If modifying these scopes, delete token.jsopn.
	//const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
	//const TOKEN_PATH = 'config.json';
	const sheets = google.sheets({version: 'v4', message});

	sheets.spreadsheets.values.get({
		spreadsheetId: '1PGPH8oWvZyplPGdZNB1p_0h_RwCp3oCABWDMzGblZf4',
		range: 'Class weapon!A2:E',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const rows = res.data.values;
		if (rows.length) {
			console.log('Name, Major:');
			// Print columns A and E, which correspond to indices 0 and 4.
			rows.map((row) => {
				console.log(`${row[0]}, ${row[4]}`);
			});
		} else {
			console.log('No data found.');
		}
	});
};

/*
	var generalChannel = client.channels.get("123456789") // Replace with known channel ID
  
    // Provide a path to a local file
    const localFileAttachment = new Discord.Attachment('D:\\logo.png')
    generalChannel.send(localFileAttachment)

    // Provide a URL to a file
    const webAttachment = new Discord.Attachment('https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png')
    generalChannel.send(webAttachment)
*/




client.login(token);