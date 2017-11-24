const nearley = require('nearley');
const grammar = require('../../grammar.js');

describe('State Query SQL parser suite', () => {
    test('Should parse simple SQL statements', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('SELECT col FROM table');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
    });

    test('Should parse simple SQL statements when keyword are lower-case', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('select col from table');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        // console.log(JSON.stringify(r));
    });

    test('Should parse SQL statements with where clauses in it - both members are identifiers', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('select col from table where col >x');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        // console.log(JSON.stringify(r));
    });

    test('Should parse SQL statements with where clauses in it - one member is a number literal', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('select col from table where col>5');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        // console.log(JSON.stringify(r));
    });

    test('Should parse SQL statements with existential operator in it', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('select * from table');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        // console.log(JSON.stringify(r));
    });

    test('Should parse SQL create table statements', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('create table users(userId int)');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        // console.log(JSON.stringify(r));
    });

    test('Should parse insert into table statements', () => {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed('insert into users(name) values(active, no)');
        const r = parser.results[0];
        expect(r).toMatchSnapshot();
        console.log(JSON.stringify(r));
    });
});