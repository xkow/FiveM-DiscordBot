const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Vis hjælpe beskeder.',
    execute(message, args, discord) {
        const helpEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('HELP')
            .setTimestamp()
            .setFooter('https://github.com/xKow', 'https://i.imgur.com/92eLTHA.png')
            .addFields(
                {name: `FiveM RELATEREDE COMMANDS`, value: `.serverinfo | *Viser information om serveren*`},
                {name: `ANDRE COMMANDS`, value: `.support | *Tilkalder en staff*\n.ticket | *Opretter en ticket*\n.help | *Viser denne besked*\n.botinfo | *Viser information omkring denne bot*`},
                {name: `STAFF COMMANDS`, value: `.purge (antal) | *Sletter seneste x antal beskeder*`},
            )
            message.channel.send(helpEmbed);
    }
}