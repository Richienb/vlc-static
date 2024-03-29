/**
Static VLC binaries for Windows, MacOS and Linux.

@example
```
import vlcStatic from 'vlc-static';

console.log(vlcStatic());
//=> 'C:\\Users\\richi\\Documents\\GitHub\\vlc-static\\bin\\win64\\vlc.exe'
```
*/
export default function vlcStatic(): string;
