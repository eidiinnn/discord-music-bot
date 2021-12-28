import { Client, Intents } from 'discord.js';

export default class CreateBot {
  constructor(token) {
    this.bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.botApiToken = token;
  }

  loginInDiscordBot() {
    return new Promise((resolve, reject) => {
      this.bot
        .login(this.botApiToken)
        .then(() => resolve(true))
        .catch((errorReturn) => reject(errorReturn));
    });
  }
}
