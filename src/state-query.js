// Read
export const select = (fields) => ({select: fields.split(',') });
export const from = (sources) => ({ sources });
export const into = from;
export const col = () => ({ col });
// Operators
export const cond = (left, op, right) => ({ left, op, right });
export const gt = () => ({ op: '>' });
export const gte = () => ({ op: '>=' });
export const lt = () => ({ op: '<' });
export const lte = () => ({ op: '<=' });
export const eq = () => ({ op: '=' });


export const where = (...clause) => {
    const operator = clause.find((c) => c.op);
    const opParts = clause.split(operator);

    return { where: {
        operator,
        left: opParts[0].trim(),
        right: opParts[1].trim()
    }};
};
// Write
export const insert = (values) => ({ values });
export const update = (clause) => ({ clause });
// export const delete = (deleteClause) => ({ deleteClause });

export const query = (...queryParts) => {
    const queryObj = queryParts.reduce(
        (query, p) => Object.assign({}, query, p), {}
    );
    queryObj.effects = [];
    queryObj.type = 'query';
    return queryObj;
}

export const mutation = (...queryParts) => {
    const queryObj = queryParts.reduce(
        (query, p) => Object.assign({}, query, p), {}
    );
    queryObj.type = 'mutation';
    return queryObj;
}