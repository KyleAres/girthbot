const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const { token, prefix } = require("./config.json");

client.on("ready", () => console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`));
 // Example of changing the bot's playing game to something useful. `client.user` is what the
 // docs refer to as the "ClientUser".
//client.user.setActivity(`Serving ${client.guilds.size} servers`);



client.on("message", (message) => {
	
	if(message.author.bot) return;
 
	if(message.content.indexOf(prefix) !== 0) return;
	//if(!message.content.startsWith(prefix)) return;
 
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	
	if(message.content.startsWith(prefix + "git")){
		message.channel.send("gud");
		return;
	}
}) 
client.login(token);