const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const { token, prefix, scope, client_secret, client_id, redirect_uris } = require("./config.json");
const fs = require('fs');
const readline = require('linebyline');
const {google} = require('googleapis');

// Load client secrets from a local file.
fs.readFile('config.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	// Authorize a client with credentials, then call the Google Sheets API.
	authorize(JSON.parse(content), spreadsheetCommand);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	//const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret); //redirect_uris[0]
/*
// Check if we have previously stored a token.
	fs.readFile(token, (err, token) => {
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}
*/
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scope,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error while trying to retrieve access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(token, JSON.stringify(token), (err) => {
				if (err) console.error(err);
				console.log('Token stored to', token);
			});
			callback(oAuth2Client);
		});
	});
}

client.on("ready", () => console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`));
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