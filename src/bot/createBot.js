import { Client, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import commandsToDeploy from '../../commandsToRegister.json';

export default class CreateBot {
  constructor(token, clientId) {
    this.bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.botApiToken = token;

    this.rest = new REST({ version: '9' }).setToken(this.botApiToken);
    this.clientId = clientId;
  }

  loginInDiscordBot() {
    return new Promise((resolve, reject) => {
      this.bot
        .login(this.botApiToken)
        .then(() => resolve(true))
        .catch((errorReturn) => reject(errorReturn));
    });
  }

  CommandsInteraction(interactionsActionsAndReply) {
    return new Promise((resolve, reject) => {
      this.bot
        .on('interactionCreate', async (interaction) => {
          if (!interaction.isCommand()) return;
          interactionsActionsAndReply(interaction);
        })
        .then(resolve(true))
        .catch((errorReturn) => reject(errorReturn));
    });
  }

  registerCommandsInGuild(guildId) {
    return new Promise((resolve, reject) => {
      this.rest
        .put(Routes.applicationGuildCommands(this.clientId, guildId), {
          body: commandsToDeploy,
        })
        .then(() => resolve(true))
        .catch((errorReturn) => reject(errorReturn));
    });
  }
}
