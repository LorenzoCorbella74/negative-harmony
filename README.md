# negative-harmony

Super small library to find the "&#127768; negative side" of notes and chords according to a given key. 

For the related music theory check [here](https://www.youtube.com/watch?v=qHH8siNm3ts). 

## Install
```bash
$ npm install negative-harmony --save
```

## Usage
```javascript
const {negativeHarmony} = require ('negative-harmony');

// or with ES6
import {negativeHarmony} from 'negative-harmony';

// Want to find the relative of Gm7b5 ??
console.log(negativeHarmony('C', ["G", "Bb", "Db", "F"]));
/* 
    Result is:
    {
        result: [ 'C', 'A', 'F#', 'D' ],
        chord: [ 'D7/C' ] 
    }
*/
```

## Development
```bash
$ npm run dev

# for testing
$ npm test
# for testing while watching file changes
$ npm run watch:test

```

## License
This project is licensed under the MIT License.

### Built With
- ES6 Javascript!!
- [BABEL 7](https://babeljs.io/docs/en/usage)
- Test with [Jest](https://jestjs.io/)
- [tonal](https://github.com/danigb/tonal)

