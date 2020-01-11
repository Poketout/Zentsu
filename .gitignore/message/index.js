const { prefix } = require("../../config")

module.exports = async message => {
    if (!message.content.startsWith(`${prefix}test`)) return

    await message.reply("test")
    message.delete()
}
