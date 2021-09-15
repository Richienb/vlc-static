import test from 'ava';
import {pathExists} from 'path-exists';
import vlcStatic from './index.js';

test('main', async t => {
	const binaryPath = vlcStatic();
	t.is(typeof binaryPath, 'string');
	t.true(await pathExists(binaryPath));
});
