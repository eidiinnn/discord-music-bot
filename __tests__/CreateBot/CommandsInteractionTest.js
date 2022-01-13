import CreateBot from '../../src/bot/createBot';

const bot = new CreateBot(process.env.BOT_API_TOKEN, process.env.CLIENT_ID);
require('dotenv').config();

test('CommandsInteraction works', () =>
  bot
    .CommandsInteraction()
    .then((returnedBoolean) => {
      expect(returnedBoolean).toBe(true);
    })
    .catch((error) => {
      throw new Error(error);
    }));
