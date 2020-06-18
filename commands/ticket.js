const discord = require("discord.js")

const categoryID = "721391510129737800";

module.exports.run = async (bot, message, args) => {

    var userName = message.author.username;
    var userDiscrimator = message.author.Discrimator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == "🎫-" + userName.toLowerCase() + "-" + userDiscrimator){
            ticketBestaat = true;

            message.reply("Je hebt al een ticket open staan!");

            return
        }
        
    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
    .setTitle("Hallo " + message.author.username)
    .setThumbnail("https://imgur.com/9lPvrTz.png")
    .setDescription("_**Uw ticket is aangemaakt!**_")
    .setFooter("Clearance ticket systeem", "https://imgur.com/9lPvrTz.png");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscrimator, {type: "text"}).then(
       (createdChannel) => {
           createdChannel.setParent(categoryID).then(
               (settedParent) => {
               
                settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false
                });

                settedParent.updateOverwrite(message.author, {
                    CREATE_INSTANT_INVITE: false,
                    VIEW_CHANNEL: true,
                    READ_MESSAGES: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true,
                    READ_MESSAGES_HISTORY: true

                });

                    var embedParent = new discord.MessageEmbed()
                    .setTitle(`Hallo ${message.author.username}`)
                    .setDescription("Welkom bij jou ticket, stel hier je vragen of meld een klacht!")
                    .setFooter(`Ticket is aangemaakt!`);

                settedParent.send(embedParent);


               }
           ).catch(err =>{
               message.channel.send("Er is iets fout gegaan (err 1), probeer het opnieuw!,");
           });
       }
    ).catch(err =>{
        message.channel.send("Er is iets fout gegaan (err 2), probeer het opnieuw!");
    });  
}

module.exports.help = {
  name: "ticket"
}