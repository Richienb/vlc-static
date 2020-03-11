const download = require("download")
const which = require("which")
const pathExists = require("path-exists")
const extractDmg = require("extract-dmg")

const boxen = require("boxen")
const chalk = require("chalk")
const terminalLink = require("terminal-link")

const { arch, platform } = process

// For updating these urls, see CONTRIBUTING.md.
const urls = {
	windows: {
		x64: "https://download.videolan.org/pub/videolan/vlc/last/win64/vlc-3.0.8-win64.zip",
		ia32: "https://download.videolan.org/pub/videolan/vlc/last/win32/vlc-3.0.8-win32.zip",
		arm64: "http://people.videolan.org/~jb/Builds/ARM/vlc-4.0.0-dev-20180508-aarch64.zip",
	},
	macos: "https://download.videolan.org/pub/videolan/vlc/last/macosx/vlc-3.0.8.dmg",
}

async function downloadFile(url, destination) {
	if (await pathExists(destination)) return
	return download(url, destination, { extract: true })
}

module.exports = (async () => {
	if (platform === "win32") {
		if (arch === "x64") return downloadFile(urls.windows.x64, "bin/windows/x64")
		if (arch === "ia32") return downloadFile(urls.windows.ia32, "bin/windows/ia32")
		if (arch === "arm64") return downloadFile(urls.windows.arm64, "bin/windows/arm64")
	}

	if (platform === "darwin") {
		await download(urls.macos, "bin", { filename: "vlc-macos.dmg" })
		return extractDmg("bin/vlc-macos.dmg", "bin/macos")
	}

	const resolved = await which("vlc", { nothrow: true })
	if (resolved) return

	let message = `Unable to find a suitable VLC binary for you current OS. Please ${terminalLink("install VLC", "https://www.videolan.org/vlc/#download")}.`
	if (platform === "linux") message = `Unable to find a suitable VLC binary for Linux. If you have snapcraft installed, run ${terminalLink(chalk.grey("sudo snap install vlc"), "snap://vlc", { fallback: false })}.`
	if (platform === "darwin") message = `Unable to find a suitable VLC binary for MacOS. Please ${terminalLink("install VLC", "https://www.videolan.org/vlc/download-macosx.html")}.`

	return console.log(boxen(message, { padding: 1, borderColor: "yellow" }))
})()
