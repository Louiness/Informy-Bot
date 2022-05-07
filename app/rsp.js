import { CommandInteraction } from 'discord.js';

export function getResult(userChoice, interaction) {
  const choices = ['rock', 'scissors', 'paper'];

  const getRandomChoise = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  let strUserChoice =
    userChoice === 4 ? getRandomChoise() : choices[userChoice - 1];

  const computerChoise = getRandomChoise();

  let score = 0;
  let result = {
    embeds: [],
    content: '',
    components: [],
    ephemeral: true,
  };
  switch (strUserChoice + computerChoise) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      score++;
      result.content = `Computer was ${computerChoise}, You were ${strUserChoice}. You Win!`;
      break;
    case 'scissorsscissors':
    case 'rockrock':
    case 'paperpaper':
      result.content = `Computer was ${computerChoise}, You were ${strUserChoice}. Draw!`;
      break;
    case 'scissorsrock':
    case 'rockpaper':
    case 'paperscissors':
      score--;
      result.content = `Computer was ${computerChoise}, You were ${strUserChoice}. You Lose!`;
      break;
  }
  console.log(
    `computer: ${computerChoise}, user: ${strUserChoice}, result: ${score}`
  );
  if (interaction instanceof CommandInteraction) {
    interaction.reply(result);

    return score;
  }
  interaction.update(result);
  return score;
}
