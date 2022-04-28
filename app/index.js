import { Intents, Client, Constants } from 'discord.js';
import { DBConnection } from './db/connect.js';
import { getResult } from './rsp.js';
import { User } from './db/user/user.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
// Intents: 봇 기능 활성화 요소
// 데이터의 민감한 특성으로 인해 아래 2개는 Privileged 특성이 활성화되어야 사용 가능
// GUILD_PRESENCES, GUILD_MEMBERS
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, //
    Intents.FLAGS.GUILD_MESSAGES, // 봇 메시지 수신 활성화
    // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on('ready', async () => {
  console.log('The bot is ready');

  const dbConnection = new DBConnection(process.env.MONGO_URI);
  dbConnection.dbConnect();

  // const guildId = '832426298638729297';
  let guildId;
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
    name: 'rsp',
    description: 'Rock Scissors Paper',
    options: [
      {
        name: 'choise',
        description: '1. Rock 2. Scissors 3. Paper 4. Random',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
        minValue: 1,
        maxValue: 4,
      },
    ],
  });
  commands?.create({
    name: 'add',
    description: 'Adds two numbers.',
    options: [
      {
        name: 'num1',
        description: 'The first numbers.',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: 'num2',
        description: 'The second numbers.',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
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
  } else if (commandName === 'rsp') {
    const user = new User();
    const userInfo = await user.isExist(interaction.user.id);
    if (userInfo) {
      const userChoise = options.getNumber('choise');
      getResult(userChoise, interaction);
    } else {
      interaction.reply({
        content:
          'You have to save User Information. Do you save User Account on db?',
        ephemeral: true,
      });
      // await user.putUser(interaction.member).then(function () {
      //   console.log('create succeed!');
      // });
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content === 'ping') {
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
