const { Client, RichEmbed } = require("discord.js")
const { tocken } = require("./config")
const { prefix } = require("./config")
const fs = require("fs")
const warns = JSON.parse(fs.readFileSync("./warns.json"))

const client = new Client({disableEveryone: true })
module.exports = {client: client }

client.login(tocken)

client.on('ready', function () {
    console.log('Bot connecté')
    client.user.setActivity('Fortnite xD', {type: "PLAYING"})
})

const handler_event_ready = require("./event/ready/index")
client.on("ready", handler_event_ready)

const handler_event_message = require("./event/message/index")
client.on('message', handler_event_message)

client.on("message", message =>{
    if(!message.guild)return
    if(message.content === prefix + "hello"){
        message.channel.send(":grin: Salut mec !")
    }
});

client.on("guildMemberAdd", user =>{
    const guild = user.guild
    switch (guild.id) {
      case '664858446125989898':
        const channel = guild.channels.get('664884068218830848')
        channel.send("Bienvenu " + user + " sur " + user.guild.name + " :tada::hugging:!" )
      break;
    
      case '657594289735598080':
        const channel2 = guild.channels.get('657987444758806528')
        channel2.send("Bienvenu " + user + "  sur " + user.guild.name + " :tada::hugging:!")
      break;
    }
});

client.on('message', message => {
    if(!message.guild) return
    
    let args = message.content.trim().split(/ +/g)

    if(args[0].toLocaleLowerCase() === prefix + "kick"){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas les permissions !")

        let member = message.mentions.members.first()

        if(!member) return message.channel.send("Identifie quelqu'un !")
        if(member.highestRole.calculaterPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas le kick !")
        if(!member.kickable) return message.channel.send("Je ne peut pas l'exclure désoler")
        member.kick()
        message.channel.send(member.user.username + " a été kick !")
    };
});

client.on("message", message => {
    if(!message.guild) return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + "clear") {
       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permissions pour utiliser cettre commande !")
       
       let count = parseInt(args[1])
        
       if(!count) return message.channel.send("Indique le nombre de message a supprimer")
       if(isNaN(count)) return message.channel.send("Indique un nombre valide")
       if(count < 1 || count > 100 ) return message.channel.send("Choisi un chiffre entre 1 et 100")

       message.channel.bulkDelete(count + 1, true)
    };
});

client.on("message", message => {
    if(!message.guild) return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + "warn") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions !")

        let member = message.mentions.members.first()

        if(!member) return message.channel.send("Mentionne un membre")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre !")

        let reason = args.slice(2).join(' ')

        if(!reason) return message.channel.send("Dit moi pourquoi ?")
        if(!warns(member.id)) {
            warns[member.id] = []
        };
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        });
        fs.writeFileSync("./warns.json", JSON.stringify(warns))
        message.channel.send(member + " à été warn pour " + reason + ":write_check_mark:")
    };
});

client.on("message", message => {
    if(!message.guild)return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + "contenu"){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permissions pour utiliser cettre commande !")

        message.channel.send("`Salut a tous et a toute`")
        message.channel.send("`Theo vous offre ce dossier pour vous montrez comment bien commencer un bot discord`")
        message.channel.send("`Il n'est un expert en creation de bot (Je suis toujours en développerment Theo me donne de plus en plus de chose a faire) mais il connais les base`")
        message.channel.send("`Enfin bref, il vous offre ce dossier, faitent s'en bonne usage et amuser vous`")
        message.channel.send("`PS: Demande si jamais tu as besoin si il peut t'aider sa sera toujours sa de pris`")
    };  
});

client.on("message", message=> {
    if(!message.guild)return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + "info"){

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permissions pour utiliser cettre commande !")

        message.channel.send("`Bonjour`")
        message.channel.send("`Alors comme sa tu a besoin d'information`")
        message.channel.send("`Ce serveur est un serveur de creation de bot discord`")
        message.channel.send("`Si tu as besoin d'aide tu peut toujoir demander dans BlaBla mais si tu a un gros problème vas dans besoin-d'aide`")
        message.channel.send("`Tu peut avoir des role speciaux suivant ce que tu veut faire et suivant si tu veut cree des bot discord ou en avoir`")
        message.channel.send("`Il y a aussi le channel suggestion si tu a des idees pour ameliorer le serveur`")
        message.channel.send(" ")
        message.channel.send("`Sur ce amuse toi`")
    }
}); 

client.on('message', message => {
    if(!message.guild) return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + 'regle'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permissions pour utiliser cettre commande !")

        message.channel.send("`Theo ma dit qu'il y avait pas vraiment beaucoup de règle saufe une ou deux:`")
        message.channel.send("`1: Ne pas dire d'insulte`")
        message.channel.send("`2: S'amuser`")
        message.channel.send("`3: Oser demander si il y a un probleme, oser demander pour faire partie du staff, oser demander des suggestion`")
        message.channel.send("`Voila ses pas grnd chose mais sa fera laffaire si vous voulais plus d'imformation pour rejoindre le staff allez sur demmande de recrutement !`")
        message.channel.send("`Sur ce Theo vous dit amuser vous bien`")
    }
});

client.on('message', message => {
    if(!message.guild) return

    let args = message.content.trim().split(/ +/g)

    if(args[0].toLowerCase() === prefix + 'staff') {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permissions pour utiliser cettre commande !") 
        
        message.channel.send("`Pour pouvoir devenir staff il faut respecter ces règles:`")
        message.channel.send("`1: Avoir des heures correcte`")
        message.channel.send("`2: Avoir un bonne réputation`")
        message.channel.send("`3: être très actif`")
        message.channel.send("`4: Pouvoir me répondre assez rapidement`")
        message.channel.send("`Et pour finir 5: Bien présenter ses motivation`")
        message.channel.send("`Voila les règle bon chance a vous !!!`")
    };
});
