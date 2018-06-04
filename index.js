const Discord = require('discord.js'); 
const bot = new Discord.Client();

const PREFIX = "!"
var randnum = 0

var dispatcher;
                        


function sendError(message, description) {
    message.channel.send({embed: {
        color: 15158332,
        description: ':x:' + description
    }});
}


bot.on('message', message => {
    if(message.content[0] === PREFIX) {
        let splitMessage = message.content.split(" ");
        if(splitMessage[0] === "!fplay") {
            if(splitMessage.length === 2)
            {
                if(message.member.voiceChannel)
                {
                    message.member.voiceChannel.join().then(connection => {
                        dispatcher = connection.playArbitraryInput(splitMessage[1]);

                        dispatcher.on('error', e => {
                            console.log(e);
                        });

                        dispatcher.on('end', e => {
                            dispatcher = undefined;
                            console.log('Fin du Son');
                        });
                    }).catch(console.log);
                }
                else
                    sendError(message, "Vous devez être dans un salon vocal pour jouer se son");
            }
            else
                sendError(message, "**  Hmmm... Il me semble que vous n'ayez pas bien utiliser mes commandes elles sont pourtant simple ... ** ");
        }
        else if(splitMessage[0] === '!fpause') {
            if(dispatcher !== undefined)
                dispatcher.pause();
        }
        else if(splitMessage[0] === '!fresume') {
            if(dispatcher !== undefined)
                dispatcher.resume();
        }
        else if (splitMessage[0] === "!fdisconnect") {
            if(dispatcher !== undefined)
            dispatcher.leaveVoiceChannel();
        }
    }
});

bot.login('NDUyODgzNjM3ODEwMjMzMzU0.DfW6cQ.jRC4KspOc-B7d4T8oxe9Xto7KI8')






bot.on('ready', () => {
    bot.user.setPresence({ game: { name: ' https://discord.gg/AejqkeF ', type: 0}})
    console.log("I'm Redy!");
});


bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "welcome").send(`:zap: ${member.user.username} ** Vient de rejoindre le discord ! Tu peux utiliser la commande !fcommande pour accéder à toutes les fonctionnalités du bot ! :fire: ** `)
    console.log("salut");
})

bot.on("guildMemberRemove", member => {
    var help_embed = new Discord.RichEmbed()
    .addField(member.guild.channels.find("name", "welcome").send(`*${member.user.username}* ** est partit sans même nous dire aurevoir ! :mailbox_with_mail: ** `))
    console.log("bye");
})




bot.on('message', message => {
    if (message.content === "!fcommande"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#848484')
        .addField("Afficher les commandes du Bot :", "   - !fcommande")
        .addField("Chaine Youtube Frenezy :", "     - !fyoutube")
        .addField("Frenez²y Twitter :", "     - !ftwitter")
        .addField("Lien d'invitation Discord :", "     - !fdiscord")
        .addField("Facebook Frenezy :", "       -!ffacebook")
        .addField("Twitch Frenezy :", "     - !ftwitch")
        .addField("radio Bot :", "     - !fradio")
        message.channel.sendEmbed(help_embed);
        console.log("liste commande");
    }


    if (message.content === "!fyoutube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#E3212E')
        .addField("Le youtube officiel de la Frenezy e-Sports est : ", "   https://www.youtube.com/channel/UCM5qZT1UzLq3UQ1JDQmuJ0g")
        
        message.channel.sendEmbed(help_embed);
        console.log("ytb");
    }

    if (message.content === "!ftwitter"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#036CC8')
        .addField("Le Twitter officiel de la Frenezy e-Sports est : ", "  https://twitter.com/EFrenezy")
        
        message.channel.sendEmbed(help_embed);
        console.log("twitter");
    }

    if (message.content === "!fdiscord"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#6C41E1')
        .addField("Voici le lien d'invitation Discord de notre serveur : ", "  https://discord.gg/6uRhzG3")
        
        message.channel.sendEmbed(help_embed);
        console.log("discord");
    }

    if (message.content === "!ffacebook"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#FF8000')
        .addField("Facebook officiel de la Frenezy e-Sports : ", "  https://www.facebook.com/Frenezyesports/")
        
        message.channel.sendEmbed(help_embed);
        console.log("facebook");
    }

    if (message.content === "!ftwitch"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#6A0888')
        .addField("Twitch officiel de la Frenezy e-Sports : ", "  https://www.twitch.tv/tvfrenezy")
        
        message.channel.sendEmbed(help_embed);
        console.log("facebook");
    }

    if (message.content === "!fradio"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff9999')
        .addField("Pour utiliser la Radio taper !fplay suivis du lien de votre radio. (le lien doit obligatoiremet venir de cette liste de site : http://fluxradios.blogspot.fr/p/flux-radios-francaise.html")
        
        message.channel.sendEmbed(help_embed);
        console.log("fradio");
    }
});  
