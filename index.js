const Discord = require(`discord.js`)
const fetch = require(`node-fetch`)


const client = new Discord.Client({
	makeCache: Discord.Options.cacheWithLimits({
		messageCacheMaxSize: 150,
		messageCacheLifetime: 45,
		messageSweepInterval: 45,
	}),
	partials: [ Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.User],
	fetchAllMembers: false,
	allowedMentions: {parse: ['users'], repliedUser: false},
	intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.DirectMessages, Discord.GatewayIntentBits.MessageContent],
});

client.on("messageCreate", async (message) => {
    if(!message.content) return;
    if(message.content.toLowerCase().includes(`meow`) && !message.author.bot){
        return await message.reply(`meow meow`)
    }
    if(message.content.toLowerCase().includes(`catgirl`) && !message.author.bot){
        let data = await fetch("https://api.waifu.pics/sfw/neko").then(res => res.json());
    		return await message.reply({
                content: `catgirls? Not quite a cat but close enough i suppose`,
    			embeds: [new Discord.EmbedBuilder()
    			.setImage(data.url)]
    		})
    }
    if(message.content.toLowerCase().includes(`cat`) && !message.author.bot){
        let data = await fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json());
    		return await message.reply({
                content: `cats? i like cats, heres a cat :cat2:`,
    			embeds: [new Discord.EmbedBuilder()
    			.setImage(data[0].url)]
    		})
    }
    if(message.content.toLowerCase().includes(`nya`) && !message.author.bot){
        return await message.reply(`Nyaa- wait thats not what cats sound like <a:CatStab:1063612412638531644>`)
    }
});


client.on("error", (e) => {
    console.error(e);
});
process.on("uncaughtException", (e) => console.error(e));
process.on("unhandledRejection", (e) => console.error(e));

client.login(`TOKEN_HERE`);
