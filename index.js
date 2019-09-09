const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("!parancsok", { type: "PLAYING" });

});



bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let nd = messageArray[1];
    let rd = messageArray[2];
    let args = messageArray.slice(1);
    if (cmd === `${prefix}lemon`) {

        let botThumb = bot.userAvatarURL;
        let testembed = new Discord.RichEmbed()
            .setColor("#00ff1d")
            .setImage("");
        message.channel.send(testembed);
        console.log(`${message.author.username} GIF!`);
        return;
    }

    if (cmd === `${prefix}ban`) {
      let banPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!banPerson) message.channel.send("Adj meg egy felhasználót");
      let reason = args.join(" ").slice(22);
      if (!reason) message.channel.send("Adj meg egy okot!")
      if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nem bannolhatsz embert!");
      if (banPerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nem bannolhatsz staffot!");
      let bicon = bot.user.displayAvatarURL;

      let banEmbed = new Discord.RichEmbed()
          .setTitle("->Ban<-")
          .setColor("#ff0000")
          .setThumbnail(bicon)
          .addField("Bannolt Személy:", `${banPerson} ID: ${banPerson.id}`)
          .addField("A Staff aki bannolta:", `@${message.author.username} ID: ${message.author.id}`)
          .addField("Indok:", reason)
          .setTimestamp(message.createdAt)
          .setFooter(`© [2019] - Adam123#6126`);

      let sendTo = message.guild.channels.find(`name`, `bans`);
      if (!sendTo) return message.channel.send("Nem találom a ban csatornát!");

      message.guild.member(banPerson).ban(reason);
      sendTo.send(banEmbed);
      console.log(`${message.author.id} Ban kiosztva ${banPerson} ok: ${ok}!`);

  }


  if (cmd === `${prefix}kick`) {
      let kickPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!kickPerson) message.channel.send("Adj meg egy felhasználót!");
      let kickReason = args.join(" ").slice(22);
      if (!kickReason) message.channel.send("Adj meg egy okot!");
      if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nem bannolhatsz embert!");
      if (kickPerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nem bannolhatsz staffot!");
      let bicon = bot.user.displayAvatarURL;

      let kickEmbed = new Discord.RichEmbed()
          .setTitle("->Kick<-")
          .setDescription("An embed for kicking people")
          .setColor("#c12847")
          .setThumbnail(bicon)
          .addField("Kickelt Személy", `${kickPerson} with ID ${kickPerson.id}`)
          .addField("A staff aki bannolta:", `@${message.author.username} ID ${message.author.id}`)
          .addField("Indok", kickReason)
          .setTimestamp(message.createdAt)
          .setFooter(`© [2019] - Adam123#6126`);

      let kickTo = message.guild.channels.find(`name`, `kicks`);
      if (!kickTo) return message.channel.send("Nem találom a kick csatornát");

      message.guild.member(kickPerson).kick(kickReason);
      kickTo.send(kickEmbed);
      console.log(`${message.author.id} Ban kiosztva ${kickPerson} ok: ${kickok}!`);

  }

  if (cmd === `${prefix}clear`) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Te nem törölhetsz üzenetet!");
      if (!args[0]) return message.reply("Usage: !clear <üzenet száma>")
      message.channel.bulkDelete(args[0]).then(() => {
          message.channel.send(`Törölve ${args[0]} üzenet!`).then(message => message.delete(5000));
      });
      console.log(`${message.author.username} törölve ${args[0]} üzenet!`);
  }

  if (cmd === `${prefix}say`) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot do that!");
      let bMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(bMessage);

      console.log(`${message.author.username} sended a message with me: ${bMessage}`);
  }





  if (cmd === `${prefix}info`){


      let testembed = new Discord.RichEmbed()
          .setAuthor(message.author.username)
          .setTitle("Bot információ")
          .setDescription("")
          .setColor("#00ff1a")
          .addField("Készítés dátuma:", "2019.szeptember.09")
          .addField("Készítőm/Fejlesztőm:", "Hamurkaa | FყɾҽSϙαυԃZ, Helper: iTsSHacker")
          .addBlankField()
          .addField("Programozási nyelv:", "JavaScript")
          .setFooter("© [2019] - FyreMCGT");

      message.channel.send(testembed);
      console.log(`${message.author.username} info embed!`);

  }



});

bot.login(tokenfile.token); 
