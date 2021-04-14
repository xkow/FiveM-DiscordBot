
module.exports = {
    name: "discordinfo",
    description: "Se information om discorden",
    execute(message, args, discord){
        const members = message.guild.members.cache;
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const infoEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('DISCORD SERVER INFO')
            .setTimestamp()
            .setFooter('https://github.com/xKow', 'https://i.imgur.com/92eLTHA.png')
            .addFields(
                {name: `NAVN:`, value: `${message.guild.name}`},
                {name: `MEDLEMMER:`, value: `${message.guild.memberCount}`},
                {name: `BOTS:`, value: `${members.filter(member => member.user.bot).size}`},
                {name: `BOOST ANTAL:`, value: `${message.guild.premiumSubscriptionCount || '0'}`},
                {name: `BOOST TIER:`, value: `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'Ingen boosts'}`},
                {name: `ANTAL ROLLER:`, value: `${roles.length}`},
            )
        message.channel.send(infoEmbed);
    }}