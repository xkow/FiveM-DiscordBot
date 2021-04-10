const discord = require('discord.js');
const fs = require('fs');
const fivereborn = require('fivereborn-query');
const client = new discord.Client();
const config = require('./config.json');
client.commands = new discord.Collection();

prefix = '.'

client.on('ready', () => {
    console.log(`Logged ind som ${client.user.username}. Klar på ${client.guilds.cache.size} servers, med et total af ${client.users.cache.size} users`)
    function activity(){
        setTimeout(() => { 
            fivereborn.query(`${config.ip}`,`${config.port}`, (error, data) => {
                if (error) { 
                    console.log(error);
                } else {
                    client.user.setActivity(`${data.clients}/${data.maxclients} online`, { type: "WATCHING" });
                }
            });
            activity(); 
        }, 5000);
    };
    activity(); 
})



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
    }
})

client.login(config.token)
