const discord = require('discord.js')
const fivereborn = require('fivereborn-query')
const config = require('../config.json');

module.exports = {
    name: "serverinfo",
    description: "Få information om serveren",
    execute(message, args){
        fivereborn.query(`${config.ip}`,`${config.port}`, (error, data) => {
        const informationEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('SERVER INFORMATION')
            .setFooter('https://github.com/xKow', 'https://i.imgur.com/92eLTHA.png')
            .addFields(
                {name: `SERVER:`, value: `${data.hostname}`},
                {name: `ONLINE SPILLERE:`, value: `${data.clients}/${data.maxclients}`},
                {name: `GAMETYPE:`, value: `${data.gametype}`},
                {name: `MAP:`, value: `${data.mapname}`},
            )
            message.channel.send(informationEmbed);
        })
    }
}
