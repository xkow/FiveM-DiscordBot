const discord = require('discord.js')
const config = require('../config.json');

module.exports = {
    name: "ticket",
    aliases: [],
    permissions: [],
    description: "Opret en ticket!",
    async execute(message, args, client, discord) {
      const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
      
      channel.setParent(`${config.ticketcategoryID}`);

      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(message.author, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });  

      const reactionMessage = await channel.send('**HAV FØLGENDE KLAR:**\n*Dit ID:*\n*Personen ID:*\n*Videobevis:*\n*En god forklaring på hvad der er sket:*')

      try {
        await reactionMessage.react('🔒');
        await reactionMessage.react('⛔');
      } catch (error) {
        channel.send("Fejl i sending af emojis!");
        throw error;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send("Sletter denne kanal om 5 sekunder.");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      message.channel
        .send(`Vi er klar til at hjælpe hurtigst muligt ${channel}!`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
          setTimeout(() => message.delete(), 3000);
        })
        .catch((error) => {
          throw error;
        });
    },
  };
  