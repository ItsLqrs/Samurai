const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Vang het idee op.
    var suggestion = args.join(" ");
 
    // Kijk na als er een idee is meegegeven.
    if (!suggestion) return message.channel.send("Geen Idee meegegeven gelieve een idee mee te geven.");
 
    // Maak het embed aan.
    var suggestionEmbed = new discord.RichEmbed()
        .setTitle("Nieuw Suggestie")
        .setColor("#00FF00")
        .addField("suggestion: ", suggestion)
        .addField("Idee van:", message.author);
 
    // Vind het kanaal.
    var suggestionChannel = bot.channels.get('718925542258245694');
    if (!suggestionChannel) return message.channel.send("Kan het kanaal niet vinden");
 
    // Verzend het bericht en voeg er reacties aan toe.
    suggestionChannel.send(suggestionEmbed).then(embedMessage => {
        embedMessage.react('👎');
        embedMessage.react('👍');
    });
 
    // Einde.
 
}
 
module.exports.help = {
    name: "suggestie",
    description: "Heb je een idee. Zet het dan hier en misschien passen we het toe."
}