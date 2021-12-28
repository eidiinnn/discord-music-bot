import CreateBot from '../../src/createBot';

require('dotenv').config();

const botApiToken = process.env.BOT_API_TOKEN;
const wrongBotApiToken = 'wrong-token';

test('loginInDiscordBot works', () => {
  const bot = new CreateBot(botApiToken);
  return bot
    .loginInDiscordBot()
    .then((returnedBoolean) => {
      expect(returnedBoolean).toBe(true);
    })
    .catch((error) => {
      throw new Error(error);
    });
});

test('loginInDiscordBot detect error with API token', () => {
  const bot = new CreateBot(wrongBotApiToken);
  return bot
    .loginInDiscordBot()
    .then()
    .catch((error) => {
      expect(() => {
        throw new Error(error);
      }).toThrow();
    });
});
