/**
 * Static VLC binaries for Windows, MacOS and Linux.
 * @example
 * ```
 * const vlcStatic = require("vlc-static");
 *
 * vlcStatic();
 * //=> 'C:\\Users\\richi\\Documents\\GitHub\\vlc-static\\bin\\win64\\vlc.exe'
 * ```
*/
declare function vlcStatic(): string

export = vlcStatic
