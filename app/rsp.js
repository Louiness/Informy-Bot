const getResult = (userChoice, interaction) => {
  const choices = ['rock', 'scissors', 'paper'];

  const getRandomChoise = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  let strUserChoice =
    userChoice === 4 ? getRandomChoise() : choices[userChoice - 1];

  const computerChoise = getRandomChoise();

  let result = 0;
  switch (strUserChoice + computerChoise) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      result++;
      interaction.reply({
        content: `Computer was ${computerChoise}, You were ${strUserChoice}. You Win!`,
      });
      break;
    case 'scissorsscissors':
    case 'rockrock':
    case 'paperpaper':
      interaction.reply({
        content: `Computer was ${computerChoise}, You were ${strUserChoice}. Draw!`,
      });
      break;
    case 'scissorsrock':
    case 'rockpaper':
    case 'paperscissors':
      result--;
      interaction.reply({
        content: `Computer was ${computerChoise}, You were ${strUserChoice}. You Lose!`,
      });
      break;
  }
  console.log(
    `computer: ${computerChoise}, user: ${strUserChoice}, result: ${result}`
  );
  return result;
};

module.exports.getResult = getResult;
