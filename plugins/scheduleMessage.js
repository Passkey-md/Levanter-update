const {
	bot,
	parsedJid,
	validateTime,
	createSchedule,
	delScheduleMessage,
	deleteScheduleTask,
	getScheduleMessage,
} = require('../lib/')

bot(
	{
		pattern: 'setschedule ?(.*)',
		fromMe: true,
		desc: 'To set Schedule Message',
		type: 'schedule',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send(
				'*Reply to a Message, which is scheduled to send*'
			)
		const [jid, time] = match.split(',')
		const [isJid] = parsedJid(jid)
		const isTimeValid = validateTime(time)
		if (!isJid || !isTimeValid)
			return await message.send(
				'*Example : setschedule 91987654321@s.whatsapp.net, 9-9-13-8 (min-hour-day-month in 24 hour format)*'
			)
		await createSchedule(isJid, isTimeValid, message, message.jid)
		await message.send('_Successfully Scheduled_')
	}
)

bot(
	{
		pattern: 'getschedule ?(.*)',
		fromMe: true,
		desc: 'To get all Schedule Message',
		type: 'schedule',
	},
	async (message, match) => {
		const schedules = await getScheduleMessage()
		if (schedules.length < 1)
			return await message.send('_There is no any schedules_')
		let msg = ''
		for (const schedule of schedules) {
			msg += `Jid : *${schedule.jid}*\nTime : ${schedule.time}\n\n`
		}
		return await message.send(msg.trim())
	}
)

bot(
	{
		pattern: 'delschedule ?(.*)',
		fromMe: true,
		desc: 'To delete Schedule Message',
		type: 'schedule',
	},
	async (message, match) => {
		if (!match)
			return await message.send(
				'*Example : delschedule 9198765431@s.whatsapp.net, 8-8-10-10*'
			)
		const [jid, time] = match.split(',')
		const [isJid] = parsedJid(jid)
		const isTimeValid = validateTime(time)
		if (!isJid || !isTimeValid)
			return await message.send(
				'*Example : delschedule 9198765431@s.whatsapp.net, 8-8-10-10*'
			)
		const isDeleted = await delScheduleMessage(isJid, isTimeValid)
		if (!isDeleted) return await message.send('_Schedule not found!_')
		deleteScheduleTask(isJid, isTimeValid)
		return await message.send('_Schedule deleted_')
	}
)
