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


const activities_list = [
    "with the &help command.", 
    "with the developers console",
    "with some code", 
    "with JavaScript"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {type: "WATCHING"}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});


bot.on("guildMemberAdd", member => {
 
    var welkomChannel = bot.channels.get('708224734013161472');
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
    var welkomChannel = bot.channels.get('708224734013161472');
    if (!channel) console.log("Kan het kanaal niet vinden.");
 
    var joinEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setDescription(`***Jammer dat je weg gaat*** ${member.user.username}.`)
        .setTimestamp()
        .setFooter("Gebruiker Geleaved.");
 
    channel.send(joinEmbed);
 
});


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