import { select, from, where, query } from '../state-query';

describe('State Query suite', () => {
    test('Should allow defining new queries', () => {
            const q = query(
                select('x,y'),
                from('widgets'),
                where('x > 20')
            );
            console.log(q);
    });
});