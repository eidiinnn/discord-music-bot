import verifyAfterToPlay from './tools/verifyAfterToPlay';
import play from './commands/play';
import stop from './commands/stop';

const { Client, Intents } = require('discord.js');
const { Player } = require('discord-player');

export default async function musicPlayerInteraction(interaction) {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  });
  const player = new Player(client);

  if (interaction.commandName === 'play') {
    const verifyAfterToPlayResult = verifyAfterToPlay(interaction);
    if (verifyAfterToPlayResult !== true) return verifyAfterToPlayResult;
    return play(interaction, player);
  }

  return interaction.reply({
    content: 'error',
    ephemeral: true,
  });
}
