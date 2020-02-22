"use strict"

const path = require("path")
const globby = require("globby")
const which = require("which")

const { arch, platform } = process

const resolve = (pattern) => path.resolve(globby.sync(pattern)[0])

module.exports = () => {
	if (platform === "win32") {
		if (arch === "x64") return resolve("./bin/win64/*/vlc.exe")
		if (arch === "ia32") return resolve("./bin/win32/*/vlc.exe")
		return resolve("./bin/arm64/*/vlc.exe")
	}

	if (platform === "darwin") {
		return resolve("./bin/darwin/vlc")
	}

	const resolved = which.sync("vlc")
	if (resolved) return resolved

	let message = "Unable to find a suitable VLC binary for you current OS. Please install VLC."
	if (platform === "linux") message = "Unable to find a suitable VLC binary for Linux. If you have snapcraft installed, run `sudo snap install vlc`."
	if (platform === "darwin") message = `Unable to find a suitable VLC binary for MacOS. Please install VLC.`

	throw new Error(message)
}