function createObjectToBeReturn(message) {
  return {
    content: message,
    ephemeral: true,
  };
}

export default function verifyAfterToPlay(interaction) {
  if (!interaction.member.voice.channelId)
    return interaction.reply(
      createObjectToBeReturn('You are not in a voice channel!')
    );

  if (
    interaction.guild.me.voice.channelId &&
    interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
  )
    return interaction.reply(
      createObjectToBeReturn('You are not in my voice channel!')
    );

  return true;
}
