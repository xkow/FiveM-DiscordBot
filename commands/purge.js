const Discord = require('discord.js')

module.exports = {
    name: 'purge',
    description: 'Purge op til 99 messages.',
    async run(message, args, client) {
        if(message.member.permissions.has("KICK_MEMBERS")){
            if(!args[0]) return message.channel.send('Venligst specificer et tal i mellem 1 - 99')
            if(isNaN(args[0])) return message.channel.send('Det er ikke et valid tal.')
            if(parseInt(args[0]) > 99) return message.channel.send('Max antal beskeder jeg kan slette er 99')
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(error => message.channel.send(`**ERROR:** ${error}`))
                message.channel.send('Slettede ' + args[0]  + " beskeder.")
        }
     else {
            message.channel.send("Manglende permission: `KICK_MEMBERS`")
        }

    },
};