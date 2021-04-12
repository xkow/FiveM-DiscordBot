const discord = require('discord.js');
const fs = require('fs');
const fivereborn = require('fivereborn-query');
const client = new discord.Client();
const config = require('./config.json');
client.commands = new discord.Collection();

prefix = '.'

client.on('ready', () => {
    console.log(`Logged ind som ${client.user.username}. Klar på ${client.guilds.cache.size} servers, med et total af ${client.users.cache.size} users\nBot by xkow#7242`)
    function activity(){
        setTimeout(() => { 
            fivereborn.query(`${config.ip}`,`${config.port}`, (error, data) => {
                if (error) { 
                    console.log(error);
                    client.user.setActivity(`.help - https://github.com/xKow/FiveM-DiscordBot`, { type: "WATCHING" });
                } else {
                    client.user.setActivity(`${data.clients}/${data.maxclients} online`, { type: "WATCHING" });
                }
            });
            activity(); 
        }, 5000);
    };
    activity(); 
})

client.on("message", (message) => {
    if (message.content.startsWith(".bot", ".botinfo")) {
        const madeByEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('BOT INFORMATION')
            .setFooter('https://github.com/xKow', 'https://i.imgur.com/92eLTHA.png')
            .addFields(
                {name: `LAVET AF:`, value: `xkow#7242`},
                {name: `KODET I:`, value: `JavaScript`},
                {name: `XKOWS STEAM:`, value: `https://steamcommunity.com/id/SimonDK/`},
                {name: `XKOWS GITHUB:`, value: `https://github.com/xKow/`},
            )
            message.channel.send(madeByEmbed);
    }
  });

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message =>{
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'serverinfo'){
        client.commands.get('serverinfo').execute(message, args, client, discord);
    } else if (command == 'purge'){
        client.commands.get('purge').run(message, args, client, discord);
    } else if (command == 'ticket'){
        client.commands.get('ticket').execute(message, args, client, discord);
    } else if (command == 'support'){
        client.commands.get('support').execute(message, args, discord);
    } else if (command == 'help'){
        client.commands.get('help').execute(message, args, discord);
    }
})

client.login(config.token)
