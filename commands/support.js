module.exports = {
    name: "support",
    description: "Kontakt staff via en kommando",
    execute(message, args, discord){
        const Staff = message.guild.roles.cache.find(role => role.name == "Staff");

        const supportEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('SUPPORT')
            .setTimestamp()
            .setFooter('https://github.com/xKow', 'https://i.imgur.com/92eLTHA.png')
            .addFields(
                {name: `Vent Venligst`, value: `Du har nu kontaktet staff teamet.\n${Staff}`},
            )
            message.channel.send(supportEmbed);
        }
    }