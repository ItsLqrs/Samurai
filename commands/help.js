const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {

try{

    var text = "**__Samurai__** \n\n ```!help``` \n Met de !help command kan je zien welke commands er zijn! \n \n ``KICK_MEMBERS`` permissie nodig om dit te doen. \n \n **Meer commands in aanmaak!** ";

    message.author.send(text);

    message.reply("De commando's zijn in je prive berichten! Geen berichten ontvangen? Je dms staan op friends only.")
    
}catch(error){
    message.reply("Er is iets fout gelopen")
}

}

module.exports.help = {
    name: "help"
}