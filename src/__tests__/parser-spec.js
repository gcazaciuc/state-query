const nearley = require('nearley');
const grammar = require('../../grammar.js');
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
describe('State Query SQL parser suite', () => {
    test('Should parse SQL statements', () => {
        parser.feed('SELECT col as othercol FROM table where x');
        console.log(JSON.stringify(parser.results));
    });
});