const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageTyping,
    ] });

var Discord = require("discord.js");
//var client = new Discord.Client();
var express = require("express");
var fs = require("fs");
var message = [];
var eventStreams = [];
var app = express();

client.on("clientReady", () =>{
    console.log("logged into discord");
});

client.on(Events.InteractionCreate, async interaction => {
  console.log("aaa");

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login();

app.get("/", function(request, response){
    response.writeHead(200, {"content-type":"text/html"});
    fs.createReadStream("index.html").pipe(response);
});

app.get("/sendmsg/:data", function(request, response){
    const currentData = JSON.parse(request.parasm.data);
    mesages[currentData.msgindex].reply(currentData.reply);
    response.end();
});

app.listen(5500);
console.log("app running http://localhost:5500");