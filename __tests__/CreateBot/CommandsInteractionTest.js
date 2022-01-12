import CreateBot from '../../src/bot/createBot';

const bot = new CreateBot(process.env.BOT_API_TOKEN, process.env.CLIENT_ID);
require('dotenv').config();

test('CommandsInteraction works', () =>
  bot
    .CommandsInteraction(async (interaction) => {
      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    })
    .then((returnedBoolean) => {
      expect(returnedBoolean).toBe(true);
    })
    .catch((error) => {
      throw new Error(error);
    }));
