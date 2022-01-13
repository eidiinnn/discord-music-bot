import { Client, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import commandsToDeploy from '../../commandsToRegister.json';
import musicPlayerInteraction from './tools/music/musicPlayerInteraction';

export default class CreateBot {
  constructor(token, clientId) {
    this.bot = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
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

  CommandsInteraction() {
    return new Promise((resolve, reject) => {
      this.bot
        .on('interactionCreate', async (interaction) => {
          if (!interaction.isCommand()) return;
          musicPlayerInteraction(interaction);
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
