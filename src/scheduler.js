const DB = {};
const QUERIES_CACHE = {};

const hashQuery =(q) => JSON.stringify(q);
const getCachedQuery = (q) => {
    const queryHash = hashQuery(q);
    let query = q;
    if(QUERIES_CACHE[queryHash]) {
        query = QUERIES_CACHE[queryHash]; 
    } else {
        QUERIES_CACHE[queryHash] = q;
    }
    return QUERIES_CACHE[queryHash];
}
const selectColumn = (row, query) => {
    const select = query.select || '*';
    if (select.length === 1 && select[0] === '*') {
        return row;
    }
    return select.reduce((result, f) => {
        if (f in row) {
            result[f] = row[f];
        }
        return result;
    }, {});
}

const filterRows = (row, query) => {
    if (query.where) {
        const { operator, left, right } = query.where;
        switch(operator) {
            case '>':
                return row[left] > Number(right);
            case '<':
                return row[left] < Number(right);
            case '>=':
                return row[left] >= Number(right);
            case '<=':
                return row[left] <= Number(right);
        }
    }
    return true;
}

const runQuery = (query) => {
    const fn = function()  {
        if(query.sources) {
            query.sources.split(',').forEach((t) =>  DB[t] = DB[t] || []);
        }
        const tbl = DB[query.sources] || [];

        return tbl.filter((row) => filterRows(row, query))
                  .map((row) => selectColumn(row, query));
    }

    fn.map = function(effect) {
        if (typeof effect === 'function') {
            query.effects.push(effect);
        }
        return fn;
    }

    return fn;
}

const runMutation = (query) => {
    if(query.sources) {
        DB[query.sources] = DB[query.sources] || [];
    }
    if(query.values) {
        DB[query.sources].push(query.values);
    }
    // After a mutation is run trigger all query effects for the affected tables
    Object.keys(QUERIES_CACHE).filter((qHash) => {
        const q = QUERIES_CACHE[qHash];
        return q.type === 'query' && q.sources.indexOf(query.sources) !== -1 && q.effects.length;
    }).forEach((qHash) => {
        const q = QUERIES_CACHE[qHash];
        const result = runQuery(q)();
        q.effects.forEach((effect) => effect.call(null, result));
    });
}

export const run = (q) => {
  
    const query = getCachedQuery(q);
    if(query.type === 'query') {
        return runQuery(query);
    }
    return runMutation(query);
}

export const sync = (...elementsToSync) => {
    const table = elementsToSync[0];
    const synchronizers = elementsToSync.slice(1);
}