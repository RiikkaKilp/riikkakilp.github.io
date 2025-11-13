require("dotenv").config();

const { Message } = require("discord.js");
const {REST, Routes} = require("discord.js");

const express = require("express");
const app = express();
var fs = require("fs");
var messages = [];
var eventstreams = [];


const deployCommands = async () =>{

}

const {
    Client,
    GatewayIntentBits,
    Partials,
} = require("discord.js"); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember
    ]
});

client.on(Event.InteractionCreate, async interaction => {
    console.log("THING");
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Bot is ready.');
});

client.on('messageCreate', (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  if (message.content == "Ding Dong!"){
      message.channel.send("My Message");
    }
    messages.push(message);
    console.log("msg created: " + messages)
  var data = {
    content:message.content,
    msgindex: messages.indexOf(message),
    tag: message.author.tags
  };
  for (i in eventstreams)
    {
    eventstreams[i].write(`data: ${JSON.stringify(data)}\n\n`);
    eventstreams[i].flushHeaders();
    }
});

//app.get('/users/:userId/books/:bookId', (req, res) => {
//  res.send(req.params)
//})


app.get("/", function(request, response){
    response.writeHead(200, {"content-type":"text/html"});
    fs.createReadStream("index.html").pipe(response);
});

app.get('/sendmsg/:data', (req, res) => {
    const currentData = JSON.parse(req.params.data);
    console.log(currentData);
    console.log(currentData.msgindex);
    console.log(messages[currentData.msgindex]);
    console.log(messages[currentData.msgindex]);

    messages[currentData.msgindex].reply(currentData.reply); 
    res.send(req.params)
    res.end();

    //  console.log(req.params.userId);
});

app.get('/messages', (req, res) => {
    res.writeHead(200,{
        "content-type": "text/event-stream",
        "cache-control":"no-cache",
        "access-control-allow-origin":"*",
        "connection":"keep-alive"
    })
    res.write("data: connected!\n\n");
    eventstreams.push(res);
    res.flushHeaders();
});

app.get("/sendmsg/:data", function(request, response){
    console.log(myMessage);
    messages.channel.send("My Message");
    const currentData = JSON.parse(request.params.data);
    messages[currentData.msgindex].reply(currentData.reply);
    response.end();
});

//app.get("/", (req,res) => { res.send(‘home route hit’); });

app.listen(5500, () => {
    console.log("app running http://localhost:5500");
});

//app.listen(5500);
//console.log("app running http://localhost:5500");

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express.js!</h1>');
});

client.login(process.env.TOKEN);
