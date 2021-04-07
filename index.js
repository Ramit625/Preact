const Discord = require('discord.js');
const { prefix, prefixx, token } = require('./config.json');
const client = new Discord.Client();
var spamflag;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
  });

client.on('message', msg=>{


    //Displays a guide on how to use the bot.
    if((msg.content.startsWith(`${prefix} help`)) || msg.content.startsWith(`${prefixx} help`)){
      msg.channel.send("```Preact is a reaction automating bot, to start using it just add it to your server and you are done. \n\n\ All images or file attachments sent in your server after perfuckt is activated will automatically have upvote and downvote reactions on them. \n\n\ Custom emoji reactions and various moderation features are under deveopment.\n\n\n\n\ -Made by Krunixx Damaff'#1367```");
    }
    //detection and reactions 
    //Creates vote reactions over every post that conatains an attachment in the server.
    
    //Adds initial reactions over every attachment sent on the channel, change the channel id and create new if statements to target other channels.
    if((msg.attachments.size > 0) && (msg.channel.id !== '583647118745534465')){
      msg.react('✔️');
      msg.react('❌');
    }

    //Reacts a heart on all attachments inside a particularly targetted channel.
    if(msg.channel.id === '583647118745534465') {
      if(msg.attachments.size > 0){
        msg.react('💖');
      }
    }

    //Adds reaction to every message sent in the channel
    if(msg.channel.id === '694983720981233685'){
      msg.react('✔️');
      msg.react('❌');
    }

    //Removing conversations from image based channels
    if((msg.channel.id === '583647118745534465')){
      if(msg.attachments.size>0){
        return;
      }
      else if(msg.author.bot === false){
        msg.delete();
      }
    }

    //Anti spam general
    if((msg.content.startsWith(`${prefix} prevent spam`)) || (msg.content.startsWith(`${prefixx} prevent spam`))){
      spamflag = 1;
      msg.channel.send('Preventing bot spam now.');
    }
    if((msg.content.startsWith(`${prefix} resume spam`)) || (msg.content.startsWith(`${prefixx} resume spam`))){
      spamflag = 0;
      msg.channel.send('Spam protection paused.');
    }

    if((msg.content.startsWith(`${prefix} spam status`)) || (msg.content.startsWith(`${prefixx} spam status`))){
      if(spamflag===1){
        msg.reply("Spam prevention is on.");
      }
      else{
        msg.reply("Spam prevention is off.");
      }
    }

    //prevents certain types of messages from being sent in the channel
    if(msg.channel.id==='623917421304086546'){
     if(spamflag===1){
       if((msg.author.bot === true) || (msg.attachments.size>0) || (msg.content.includes('.com/' || '/.com'|| '.' || 'pls' || 'owo' || 'yui'))){
         msg.delete();
       }
       const filter = m => m.author.id === msg.author.id;
       msg.channel.awaitMessages(filter, {
    	 max: 1, 
	     time: 10000,
  }).then(async(collected) => { 
	     if (msg.content.startsWith(collected.first().content)) { 
		      msg.delete();
         } 

   }).catch(() => {
 return;
})
      
     }
     else{
       return;
     }
      
    }


 });



 client.login(token);
