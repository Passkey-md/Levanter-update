const got = require('got')
const path = require('path')
const {
	bot,
	parseGistUrls,
	getPlugin,
	setPlugin,
	pluginsList,
	delPlugin,
	// genButtonMessage,
	// PLATFORM,
} = require('../lib/')
const { writeFileSync, unlinkSync } = require('fs')

bot(
	{
		pattern: 'plugin ?(.*)',
		fromMe: true,
		desc: 'Install External plugins',
		type: 'plugin',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match && match !== 'list')
			return await message.send('*Example :*\nplugin url\nplugin list')
		if (match == 'list') {
			const plugins = await getPlugin()
			if (!plugins) return await message.send(`*Plugins not installed*`)
			let msg = ''
			plugins.map(({ name, url }) => {
				msg += `${name} : ${url}\n`
			})
			return await message.send('```' + msg + '```')
		}
		const isValidUrl = parseGistUrls(match)
		if (!isValidUrl || isValidUrl.length < 1) {
			const { url } = await getPlugin(match)
			if (url) return await message.send(url, { quoted: message.data })
			return await message.send('*Give me valid plugin urls/plugin_name*')
		}
		let msg = ''
		for (const url of isValidUrl) {
			try {
				const res = await got(url)
				if (res.statusCode == 200) {
					let plugin_name = /pattern: ["'](.*)["'],/g.exec(res.body)
					plugin_name = plugin_name[1].split(' ')[0]
					writeFileSync('./plugins/' + plugin_name + '.js', res.body)
					try {
						require('./' + plugin_name)
					} catch (e) {
						await message.send(e.stack, { quoted: message.quoted })
						return unlinkSync('./plugins/' + plugin_name + '.js')
					}
					await setPlugin(plugin_name, url)
					msg += `${pluginsList(res.body).join(',')}\n`
				}
			} catch (error) {
				await message.send(`${error}\n${url}`)
			}
		}
		await message.send(`_Newly installed plugins are : ${msg.trim()}_`)
	}
)

bot(
	{
		pattern: 'remove ?(.*)',
		fromMe: true,
		desc: 'Delete External Plugins',
		type: 'plugin',
	},
	async (message, match) => {
		if (!match)
			return await message.send('*Example :*\nremove mforward\nremove all')
		// const buttons = [{ text: 'REBOOT', id: 'reboot' }]
		// if (PLATFORM == 'heroku') buttons.push({ text: 'RESTART', id: 'restart' })
		if (match == 'all') {
			const plugins = await getPlugin()
			for (const plugin of plugins) {
				const paths = path.join(__dirname, '../plugins/' + plugin.name + '.js')
				try {
					await delPlugin(plugin.name)
					delete require.cache[require.resolve(paths)]
					unlinkSync(paths)
				} catch (error) {}
			}
		} else {
			const isDeleted = await delPlugin(match)
			if (!isDeleted) return await message.send(`*Plugin ${match} not found*`)
			const paths = path.join(__dirname, '../plugins/' + match + '.js')
			delete require.cache[require.resolve(paths)]
			unlinkSync(paths)
		}
		return await message.send(`_Plugins deleted, Restart BOT_`)
		// return await message.send(
		// 	await genButtonMessage(buttons, '_Plugin Deleted_'),
		// 	{},
		// 	'button'
		// )
	}
)
