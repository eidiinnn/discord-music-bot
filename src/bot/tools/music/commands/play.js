export default async function play(interaction, player) {
  const query = interaction.options.get('name').value;
  const queue = player.createQueue(interaction.guild, {
    metadata: {
      channel: interaction.channel,
    },
  });

  try {
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);
  } catch {
    queue.destroy();
    return interaction.reply({
      content: 'Could not join your voice channel!',
      ephemeral: true,
    });
  }

  await interaction.deferReply();
  const track = await player
    .search(query, {
      requestedBy: interaction.user,
    })
    .then((x) => x.tracks[0]);
  if (!track)
    return interaction.followUp({
      content: `❌ | Track **${query}** not found!`,
    });

  queue.play(track);

  return interaction.followUp({
    content: `⏱️ | Loading track **${track.title}**!`,
  });
}
