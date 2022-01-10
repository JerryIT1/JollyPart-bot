const Discord = require("discord.js")
require("dotenv").config()

const generate = require("./generate")


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello")
    }
})

const welcomeChannel = "917512229472047225"

client.on("guildMemberAdd", async (member) =>{
    const img = await generate(member)
    member.guild.channels.cache.get(welcomeChannel).send({
        content:`<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)