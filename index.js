const Discord = require('discord.js'); //Require discord module for creating new client and colorfull embeds

const client = new Discord.Client();

const configs = {
  prefix: '!',// place the prefix of your bot here
  token: 'Place here the token of your bot'
};

client.on('message', (message) => {
  if (!message.content.toLowerCase().startsWith(configs.prefix.toLowerCase()) || message.author.bot) return;
  
  var args = message.content.trim().slice(configs.prefix.length).split(' ');
  const commandName = args.shift().toLowerCase();
  
  if (commandName === 'slowmode') {
    if (!message.guild) return //send a message if you want, it will cancel the command if the command is run in direct messages
    if (!message.member.permissions.has('MANAGE_CHANNELS')/* don't use anymore "hasPermission()" because it is unnvailable in new discord.js version */) return message.channel.send(`:x: | You **must** have the \`manage channels\` permission`);
    
    let slowmode = args[0];
    if (!slowmode) return message.channel.send(`:x: | Please specify a duration. Like \`${configs.prefix}slowmode 1s\``);
    
    const ms = require('ms'); // DON'T forget to install ms with run  npm install ms  in console
    slowmode = ms(slowmode);
    
    if (!slowmode) return message.channel.send(`:x: | It isn't a valid duration. Use something ending by \`s\`, \`m\`, \`h\`, \`d\`, \`w\` etc`);
    
    message.channel.setRateLimitPerUser(slowmode, `Slowmode activate by ${message.author.tag}`);
    message.channel.send(new Discord.MessageEmbed()
      .setTitle("Slowmode")
      .setDescription(`I activated the *s l o w m o d e* in this channel to ${args[0]}`)
      .setColor('ORANGE')
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL({ dynamic: true })
    );
  };
});

client.login(configs.token);
