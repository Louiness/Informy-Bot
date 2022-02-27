const DiscordJS = require('discord.js');
const Intents = DiscordJS.Intents;
const mongoose = require('mongoose');
require('dotenv').config();

// Intents: 봇 기능 활성화 요소
// 데이터의 민감한 특성으로 인해 아래 2개는 Privileged 특성이 활성화되어야 사용 가능
// GUILD_PRESENCES, GUILD_MEMBERS
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS, //
    Intents.FLAGS.GUILD_MESSAGES, // 봇 메시지 수신 활성화
    // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on('ready', async () => {
  console.log('The bot is ready');
  await mongoose.connect(process.env.MONGO_URI || '', {
    keepAlive: true,
  });

  const guildId = '832426298638729297';
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: 'ping',
    description: 'Replies with pong.',
  });

  commands?.create({
    name: 'add',
    description: 'Adds two numbers.',
    options: [
      {
        name: 'num1',
        description: 'The first numbers.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: 'num2',
        description: 'The second numbers.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;

  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true,
    });
  } else if (commandName === 'add') {
    const num1 = options.getNumber('num1');
    const num2 = options.getNumber('num2');

    await interaction.deferReply({
      ephemeral: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    interaction.editReply({
      content: `The sum is ${num1 + num2}`,
    });
  }
});

client.on('messageCreate', async (message) => {
  if (message.content === 'ping') {
    console.log(message.member.user.username);
    message.reply({
      content: `pong,${message.member}`,
    });
    message.react('🥰');

    await message.reactions.removeAll();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    message.reply({
      content: 'await!',
    });

    message.react('😡');
  }
});

client.login(process.env.TOKEN);
