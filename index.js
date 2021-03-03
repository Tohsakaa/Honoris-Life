const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require("./token.json")


bot.on("ready", async () => {
    console.log("Le bot est allumé");
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("Honoris Life")
    }, 100)

});

bot.on("guildMemberAdd", member => {
    member.send('✨ Bienvenue sur Honoris Life, lis bien les régles & je te souhaite un bon RP. Rin.💫');
    bot.channels.cache.get('768551750860537876').send(`Bienvenue sur Honoris Life ✨${member.user}`);
    member.roles.add('768571656498708520');

});

bot.on("message", message => {

    if (message.content.startsWith("!clear")) {
        message.delete();
        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            let args = message.content.trim().split(/ +/g)

            if (args[1]) {
                if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`${args[1]} message(s) ont été parfaitement supprimé (Rin) 🌪 `)

                }
                else {
                    message.channel.send(`Merci d'indiqué une valeur correct. ( 1 à 99 ) 🌛`)
                }
            }
            else {
                message.channel.send(`⚠️ Vous devez indiquer un nombre de messages a supprimer !`)
            }

        }
        else {
            message.channel.send(`⛔️ Hoopla ! tu n'a pas les permissions requise pour pouvoir executé cette commande.`)
        }

    }
    if (message.content.startsWith("!stats")) {
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalservers = bot.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
        let totalrole = message.guild.roles.cache.get('768571656498708520').members.map(member => member.user.tag).length;

        const Honoris = new Discord.MessageEmbed()
            .setColor('#ffa200')
            .setTitle('Honoris Life Stats')
            .setURL('https://discord.gg/Wj4j28Qtx3')
            .setAuthor('Rin Tohsaka#0986', 'https://i.imgur.com/pfCyN8S.png', 'https://discord.gg/Wj4j28Qtx3')
            .setDescription('Voici les statistiques du serveurs.🙋🏼‍♂️')
            .setThumbnail('https://i.imgur.com/pfCyN8S.png')
            .addFields(
                { name: 'Nombre de members total', value: totalmembers, inline: true },
                { name: 'Nombre connéctés :', value: onlines, inline: true },
                { name: 'Nombre de serveurs auquel le bot appartient :', value: totalservers, inline: true },
                { name: 'Nombres de bots sur le serveurs :', value: totalbots, inline: true },
                { name: 'Nombre de citoyens :', value: totalrole, inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/pfCyN8S.png')
            .setTimestamp()
            .setFooter('Honoris Life ✨', 'https://i.imgur.com/PvfLjEC.png');

        message.channel.send(Honoris);
    }

});



bot.login(process.env.TOKEN);