const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const { token, prefix } = require("./config.json");

client.on("ready", () => console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`));
// Example of changing the bot's playing game to something useful. `client.user` is what the
// docs refer to as the "ClientUser".
//client.user.setActivity(`Serving ${client.guilds.size} servers`);


// checks command and calls proper function
client.on("message", (message) => {
	
	if (message.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (message.content.startsWith(prefix)) {
        processCommand(message)
    }
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
	
	//idk strange split commandd
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// reply
	if(message.content.startsWith(prefix + "git")){
		message.channel.send("gud");
		return;
	}

	message.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)



}
	
/*
	var generalChannel = client.channels.get("123456789") // Replace with known channel ID
  
    // Provide a path to a local file
    const localFileAttachment = new Discord.Attachment('D:\\logo.png')
    generalChannel.send(localFileAttachment)

    // Provide a URL to a file
    const webAttachment = new Discord.Attachment('https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png')
    generalChannel.send(webAttachment)
*/




client.login(token)