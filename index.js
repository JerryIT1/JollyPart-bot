const Discord = require("discord.js")
require("dotenv").config()
const { MessageEmbed } = require('discord.js');
const generate = require("./generate")
// const exampleEmbed = require("./embed")

const PREFIX = "!"


//Permissions needed
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})


//Logs in + sets activity
client.on("ready", () => {
    client.user.setActivity("with depression", {
        type: "STREAMING",
        url: "https://www.twitch.tv/JollyPart"
      });
    console.log(`Logged in as ${client.user.tag}`)
})


// client.on("messageCreate", (message) => {
//     if (message.content.startsWith(`${PREFIX}hi`)){
//         message.reply("Hello")
//     }
// })



//Creates an embed message
client.on("messageCreate", (message) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You need to be an admin to use this command.");
    if (message.content.startsWith(`${PREFIX}embed`)){
        
        message.delete()
        const exampleEmbed = new MessageEmbed()
        .setColor('#32a852')
        .setTitle('Welcome to JollyPart\'s Server. Please read the rules!')
        .setDescription('**1. Be Respectful**\nYou must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.\n\n**2. No spamming**\nDon\'t send a lot of small messages right after each other. Do not disrupt chat by spamming.\n\n**3. No pornographic/adult/other NSFW material**\nThis is a community server and not meant to share this kind of material.\n\n**4. Direct & Indirect Threats**\nThreats to other users of DDoS, Death, DoX, abuse, and other malicious threats are absolutely prohibited and disallowed.\n\n**5. Follow the Discord Community Guidelines**\nYou can find them here: https://discordapp.com/guidelines')
        .setTimestamp()
        
    message.channel.send({ embeds: [exampleEmbed] });
    
    }
})


//DMs a person
client.on("messageCreate", (message) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You need to be an admin to use this command.");
    const dm = `${PREFIX}dm`
    if (message.content.startsWith (`${dm}`)){
        const args = message.content.slice(dm.length).split(',');
        const user = message.mentions.users.first()
        user.send(`${args}`)
        message.delete()
    }
})



//Adds viewr role to people when they join
client.on("guildMemberAdd", async (member) =>{
    const role = member.guild.roles.cache.find(role => role.name == "Viewer")
    await member.roles.add(role.id).catch(err => console.log(err))

})

const welcomeChannel = "917512229472047225"
//Send welcome text
client.on("guildMemberAdd", async (member) =>{
    const img = await generate(member)
    member.guild.channels.cache.get(welcomeChannel).send({
        content:`<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})


client.login(process.env.TOKEN)