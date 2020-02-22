const test = require("ava")
const fs = require("fs")
const vlcStatic = require(".")

test("main", (t) => {
	const binaryPath = vlcStatic()
	t.is(typeof binaryPath, "string")
	t.true(fs.existsSync(binaryPath))
})
