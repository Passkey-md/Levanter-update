const {
  bot,
  getName,
  formatTime,
  jidToNum,
  getGids,
  parsedJid,
  isUser,
  isGroup,
} = require('../lib/')
const fm = true

bot(
  {
    pattern: 'jid',
    fromMe: fm,
    desc: 'Give jid of chat/user',
    type: 'user',
  },
  async (message, match) => {
    return await message.send(message.mention[0] || message.reply_message.jid || message.jid)
  }
)

bot(
  {
    pattern: 'left',
    fromMe: fm,
    dec: 'To leave from group',
    type: 'user',
    onlyGroup: true,
  },
  async (message, match) => {
    if (match) await message.send(match)
    return await message.leftFromGroup(message.jid)
  }
)

bot(
  {
    pattern: 'block',
    fromMe: fm,
    desc: 'Block a person',
    type: 'user',
  },
  async (message, match) => {
    const id = message.mention[0] || message.reply_message.jid || (!message.isGroup && message.jid)
    if (!id) return await message.send('*Give me a person*')
    await message.send('_Blocked_')
    await message.Block(id)
  }
)

bot(
  {
    pattern: 'unblock',
    fromMe: fm,
    desc: 'Unblock a person',
    type: 'user',
  },
  async (message, match) => {
    const id = message.mention[0] || message.reply_message.jid || (!message.isGroup && message.jid)
    if (!id) return await message.send('*Give me a person*')
    await message.send('_Unblocked_')
    await message.Unblock(id)
  }
)

bot(
  {
    pattern: 'pp',
    fromMe: fm,
    desc: 'Change Profile Picture',
    type: 'user',
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.send('*Reply to a image*')
    await message.updateProfilePicture(await message.reply_message.downloadMediaMessage())
    return await message.send('_Profile Picture Updated_')
  }
)

bot(
  {
    pattern: 'whois ?(.*)',
    fromMe: fm,
    desc: 'To get PP and about',
    type: 'misc',
  },
  async (message, match) => {
    match = parsedJid(match)[0]
    const gid = (isGroup(match) && match) || message.jid
    const id = (isUser(match) && match) || message.mention[0] || message.reply_message.jid
    let pp = ''
    try {
      pp = await message.profilePictureUrl(id || gid)
    } catch (error) {
      pp = 'https://cdn.wallpapersafari.com/0/83/zKyWb6.jpeg'
    }
    let caption = ''
    if (id) {
      try {
        const [res] = await message.fetchStatus(id)
        caption += `*Name :* ${await getName(gid, id)}\n*Num :* +${jidToNum(id)}\n*About :* ${
          res.status
        }\n*setAt :* ${res.date}`
      } catch (error) {}
    } else {
      const { subject, size, creation, desc, owner } = await message.groupMetadata(gid, !!gid)
      caption += `*Name :* ${subject}\n*Owner :* ${owner ? '+' : ''}${jidToNum(
        owner
      )}\n*Members :* ${size}\n*Created :* ${formatTime(creation)}\n*Desc :* ${desc}`
    }
    return await message.sendFromUrl(pp, { caption })
  }
)

bot(
  {
    pattern: 'gjid',
    fromMe: fm,
    desc: 'List group jids',
    type: 'user',
  },
  async (message, match) => {
    const gids = await message.getGids()
    let msg = ''
    let i = 1
    for (const gid in gids) {
      const name = gids[gid].subject
      msg += `*${i}.* *${name} :* ${gid}\n\n`
      i++
    }
    await message.send(msg.trim())
  }
)
