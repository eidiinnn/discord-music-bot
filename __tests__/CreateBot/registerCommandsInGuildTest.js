import CreateBot from '../../src/createBot';

require('dotenv').config();

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

test('registerCommandsInGuild works', () => {
  const bot = new CreateBot(process.env.BOT_API_TOKEN, process.env.CLIENT_ID);
  return bot
    .registerCommandsInGuild(process.env.GUILD_ID, commands)
    .then((returnedBoolean) => {
      expect(returnedBoolean).toBe(true);
    })
    .catch((error) => {
      throw new Error(error);
    });
});

test('registerCommandsInGuild detects an error', () => {
  const bot = new CreateBot(process.env.BOT_API_TOKEN, process.env.CLIENT_ID);
  return bot
    .registerCommandsInGuild(process.env.GUILD_ID, 'wrong-commands')
    .then()
    .catch((error) => {
      expect(() => {
        throw new Error(error);
      }).toThrow();
    });
});
