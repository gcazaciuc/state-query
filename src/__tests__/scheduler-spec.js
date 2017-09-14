import { 
    select, from, where, query, mutation, insert, into,
    col, gt, cond
} from '../state-query';
import { run, sync } from '../scheduler';

describe('Scheduler suite', () => {
    test('Should be able to run a query', (done) => {
        const greaterThan20 = cond(
            col('x'),
            gt(),
            20
        );
        const q = query(
            select('x,y'),
            from('widgets'),
            where(greaterThan20)
        );
        // Sync the widgets table const with a RESTfull API, local storage and browser url
        // sync("widgets", restSync(), localStorageSync(), urlSync());

        const insertIntoWidgets = (data) => mutation(
            insert(data),
            into('widgets')
        );
        const props = { id: 1, threshold: 20 };

        const comp = run(q)
                        .map((r) => console.log(r))
                        .map(() => console.log('Keep on mapping'));

        run(insertIntoWidgets({x: 1, y: 1}));

        setTimeout(() => {
            run(insertIntoWidgets({ x: 30, y: 1 }));
            done();
        }, 1000);
    });
});