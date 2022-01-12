import CreateBot from '../../src/bot/createBot';

require('dotenv').config();

const bot = new CreateBot(process.env.BOT_API_TOKEN, process.env.CLIENT_ID);
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

test('registerCommandsInGuild works', () =>
  bot
    .registerCommandsInGuild(process.env.GUILD_ID, commands)
    .then((returnedBoolean) => {
      expect(returnedBoolean).toBe(true);
    })
    .catch((error) => {
      throw new Error(error);
    }));

test('registerCommandsInGuild detects an error', () =>
  bot
    .registerCommandsInGuild(process.env.GUILD_ID, 'wrong-commands')
    .then()
    .catch((error) => {
      expect(() => {
        throw new Error(error);
      }).toThrow();
    }));
