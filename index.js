const discord = require("discord.js");
const botConfig = require("./botconfig.json")

const fs = require("fs");

const bot = new discord.Client();	
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err)

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is gelnden`);

        bot.commands.set(fileGet.help.name, fileGet);	



    })


});


bot.on("ready", async () => {

    console.log(`${bot.user.username} Ready`);

    bot.user.setActivity("Dean zijn dikke reet", { type: "WATCHING" });

});

bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find("name", "「💬」openbaar");
    if (!channel) console.log("Kan het kanaal niet vinden.");	

    var joinEmbed = new discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setDescription(`Hoi ${member.user.username}, ***Welkom op de server***.`)
    .setColor("#00FF00")
    .setTimestamp()
    .setFooter("Gebruiker gejoined.");	

    channel.send(joinEmbed);

});

bot.on("guildMemberRemove", member => {
    const channel = member.guild.channels.find("name", "「💬」openbaar");
    if (!channel) console.log("Kan het kanaal niet vinden.");

    var joinEmbed = new discord.RichEmbed()	
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setColor("#FF0000")
    .setDescription(`***Jammer dat je weg gaat*** ${member.user.username}.`)
    .setTimestamp()
    .setFooter("Gebruiker Geleaved.");

    channel.send(joinEmbed);

});


if (command === `${prefix}kick`) {


    var kickUser = message.guild.member(message.mentions.users.first()  ||  message.guild.members(arguments[0]));

    if(!kickUser) return message.channel.send("Gebruiker is niet gevonden");

    var reason = arguments.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("sorry jij kan dit niet doen!");

    if(kickUser.hasPermission("MANAGE_MESSAGE")) return message.member.send("Deze gebruiker kan je niet kicken!");

    var kick = new discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#ee0000")
    .addField("Kicked User", kickUser)
    .addField("Gekickd door", message.author)
    .adField("Reden", reason);

    var kickChannel = message.guild.channels.find(`name`, "「💭」logs");
    if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);


    return;

};




bot.on("message", async message => {
        //Als bot bericht stuurt stuur dan return
        if (message.author.bot) return;

        if (message.channel.type === "dm") return;

        var prefix = botConfig.prefix;

        var messageArray = message.content.split(" ")


        var command = messageArray[0];

        var arguments = messageArray.slice(1);


        var commands = bot.commands.get(command.slice(prefix.length));

        if (commands) commands.run(bot, message, arguments);

    });
    
    bot.login(process.env.token); 