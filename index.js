"use strict"

const path = require("path")
const globby = require("globby")
const which = require("which")

const { arch, platform } = process

const resolve = pattern => path.resolve(__dirname, globby.sync(pattern, { cwd: __dirname })[0])

module.exports = () => {
	if (platform === "win32") {
		if (arch === "x64") {
			return resolve("./bin/windows/x64/*/vlc.exe")
		}

		if (arch === "ia32") {
			return resolve("./bin/windows/ia32/*/vlc.exe")
		}

		return resolve("./bin/windows/arm64/*/vlc.exe")
	}

	const resolved = which.sync("vlc", { nothrow: true })
	if (resolved) {
		return resolved
	}

	let message = "Unable to find a suitable VLC binary for you current OS. Please install VLC."
	if (platform === "linux") {
		message = "Unable to find a suitable VLC binary for Linux. If you have snapcraft installed, run `sudo snap install vlc`."
	}

	if (platform === "darwin") {
		message = "Unable to find a suitable VLC binary for MacOS. Please install VLC."
	}

	throw new Error(message)
}
