// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$subexpression$1", "symbols": ["select"]},
    {"name": "main$subexpression$1", "symbols": ["create"]},
    {"name": "main$subexpression$1", "symbols": ["insert"]},
    {"name": "main", "symbols": ["main$subexpression$1"], "postprocess": function(d) { return d[0]; }},
    {"name": "select$ebnf$1", "symbols": ["select_clauses"], "postprocess": id},
    {"name": "select$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "select", "symbols": ["select_keyword", "whitespace", "column_list", "whitespace", "from_clause", "select$ebnf$1"], "postprocess":  
        function(d) {
            return { type: 'select', cols: d[2], from: d[4], clauses: d[5] }; 
        } 
        },
    {"name": "create$ebnf$1", "symbols": ["whitespace"], "postprocess": id},
    {"name": "create$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "create$ebnf$2", "symbols": ["whitespace"], "postprocess": id},
    {"name": "create$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "create", "symbols": ["create_table_keyword", "whitespace", "table_name", "create$ebnf$1", {"literal":"("}, "column_defs", "create$ebnf$2", {"literal":")"}], "postprocess": 
        function(d) {
            return { type: 'create_table', name: d[2], columns: d[5] }; 
        }
        },
    {"name": "insert$ebnf$1", "symbols": ["whitespace"], "postprocess": id},
    {"name": "insert$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "insert$ebnf$2", "symbols": ["column"]},
    {"name": "insert$ebnf$2", "symbols": ["insert$ebnf$2", "column"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "insert", "symbols": ["insert_keyword", "whitespace", "table_name", "insert$ebnf$1", {"literal":"("}, "insert$ebnf$2", {"literal":")"}, "values_keyword"], "postprocess": 
        function(d) {
            return { type: 'insert', table: d[2], columns: [] }; 
        }
        },
    {"name": "from_clause", "symbols": ["from_keyword", "whitespace", "table_name"], "postprocess": function(d) { return { type: 'from', tables: d[2] }; }},
    {"name": "column_list$subexpression$1", "symbols": ["column_alias"]},
    {"name": "column_list$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "column_list$subexpression$1", "symbols": ["column"]},
    {"name": "column_list", "symbols": ["column_list$subexpression$1"], "postprocess": function(d) { return { type: 'columnList', cols: d[0] }; }},
    {"name": "column_alias$subexpression$1", "symbols": [/[aA]/, /[sS]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "column_alias", "symbols": ["column", "whitespace", "column_alias$subexpression$1", "whitespace", "column"], "postprocess": function(d) { return { type: 'col', name: d[0].name, alias: d[4].name }; }},
    {"name": "column", "symbols": ["identifier"], "postprocess": function(d) { return { type: 'column', name: d[0], alias: d[0] }; }},
    {"name": "column_defs$ebnf$1$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "column_defs$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "column_defs$ebnf$1$subexpression$1", "symbols": ["column_def", "column_defs$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "column_defs$ebnf$1", "symbols": ["column_defs$ebnf$1$subexpression$1"]},
    {"name": "column_defs$ebnf$1$subexpression$2$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "column_defs$ebnf$1$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "column_defs$ebnf$1$subexpression$2", "symbols": ["column_def", "column_defs$ebnf$1$subexpression$2$ebnf$1"]},
    {"name": "column_defs$ebnf$1", "symbols": ["column_defs$ebnf$1", "column_defs$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "column_defs", "symbols": ["column_defs$ebnf$1"], "postprocess":  
        function(d) {
            return d[0][0];
        }
        },
    {"name": "column_def", "symbols": ["identifier", "whitespace", "data_type"], "postprocess": 
        function(d) {
            return { type: 'col', name: d[0], alias: d[0], data: d[2] };
        }
        },
    {"name": "data_type$subexpression$1", "symbols": [/[iI]/, /[nN]/, /[tT]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$1"]},
    {"name": "data_type$subexpression$2", "symbols": [/[fF]/, /[lL]/, /[oO]/, /[aA]/, /[tT]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$2"]},
    {"name": "data_type$subexpression$3", "symbols": [/[tT]/, /[eE]/, /[xX]/, /[tT]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$3"]},
    {"name": "data_type$subexpression$4", "symbols": [/[dD]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$4"]},
    {"name": "data_type$subexpression$5", "symbols": [/[dD]/, /[aA]/, /[tT]/, /[eE]/, /[tT]/, /[iI]/, /[mM]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$5"]},
    {"name": "data_type$subexpression$6", "symbols": [/[tT]/, /[iI]/, /[mM]/, /[eE]/, /[sS]/, /[tT]/, /[aA]/, /[mM]/, /[pP]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$6"]},
    {"name": "data_type$subexpression$7", "symbols": [/[tT]/, /[iI]/, /[mM]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$7"]},
    {"name": "data_type$subexpression$8", "symbols": [/[yY]/, /[eE]/, /[aA]/, /[rR]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "data_type", "symbols": ["data_type$subexpression$8"], "postprocess":  
        function(d) {
            return d[0];
        }
        },
    {"name": "table_name", "symbols": ["identifier"]},
    {"name": "select_clauses$subexpression$1", "symbols": ["where_clause"]},
    {"name": "select_clauses$subexpression$1", "symbols": ["group_by_clause"]},
    {"name": "select_clauses$subexpression$1", "symbols": ["having_clause"]},
    {"name": "select_clauses$subexpression$1", "symbols": ["order_by_clause"]},
    {"name": "select_clauses", "symbols": ["select_clauses$subexpression$1"]},
    {"name": "where_clause", "symbols": ["whitespace", "where_keyword", "whitespace", "binary_expression"], "postprocess": function(d) { return { type: 'where', clauses: d[3] }  }},
    {"name": "group_by_clause", "symbols": ["whitespace", "group_keyword", "whitespace", "values_list"], "postprocess": function(d) { return { type: 'groupBy', clauses: d[3] }  }},
    {"name": "having_clause", "symbols": ["whitespace", "having_keyword", "whitespace", "binary_expression"], "postprocess": function(d) { return { type: 'having', clauses: d[3] }  }},
    {"name": "order_by_clause", "symbols": ["whitespace", "order_keyword", "whitespace", "values_list"], "postprocess": function(d) { return { type: 'orderBy', cols: d[3] }  }},
    {"name": "select_keyword$subexpression$1", "symbols": [/[sS]/, /[eE]/, /[lL]/, /[eE]/, /[cC]/, /[tT]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "select_keyword", "symbols": ["select_keyword$subexpression$1"]},
    {"name": "where_keyword$subexpression$1", "symbols": [/[wW]/, /[hH]/, /[eE]/, /[rR]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "where_keyword", "symbols": ["where_keyword$subexpression$1"]},
    {"name": "group_keyword$subexpression$1", "symbols": [/[gG]/, /[rR]/, /[oO]/, /[uU]/, /[pP]/, {"literal":" "}, /[bB]/, /[yY]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "group_keyword", "symbols": ["group_keyword$subexpression$1"]},
    {"name": "having_keyword$subexpression$1", "symbols": [/[hH]/, /[aA]/, /[vV]/, /[iI]/, /[nN]/, /[gG]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "having_keyword", "symbols": ["having_keyword$subexpression$1"]},
    {"name": "order_keyword$subexpression$1", "symbols": [/[oO]/, /[rR]/, /[dD]/, /[eE]/, /[rR]/, {"literal":" "}, /[bB]/, /[yY]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "order_keyword", "symbols": ["order_keyword$subexpression$1"]},
    {"name": "from_keyword$subexpression$1", "symbols": [/[fF]/, /[rR]/, /[oO]/, /[mM]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "from_keyword", "symbols": ["from_keyword$subexpression$1"]},
    {"name": "create_table_keyword$subexpression$1", "symbols": [/[cC]/, /[rR]/, /[eE]/, /[aA]/, /[tT]/, /[eE]/, {"literal":" "}, /[tT]/, /[aA]/, /[bB]/, /[lL]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "create_table_keyword", "symbols": ["create_table_keyword$subexpression$1"]},
    {"name": "values_keyword$subexpression$1", "symbols": [/[vV]/, /[aA]/, /[lL]/, /[uU]/, /[eE]/, /[sS]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "values_keyword", "symbols": ["values_keyword$subexpression$1"]},
    {"name": "insert_keyword$subexpression$1", "symbols": [/[iI]/, /[nN]/, /[sS]/, /[eE]/, /[rR]/, /[tT]/, {"literal":" "}, /[iI]/, /[nN]/, /[tT]/, /[oO]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "insert_keyword", "symbols": ["insert_keyword$subexpression$1"]},
    {"name": "whitespace", "symbols": ["__"]},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"]},
    {"name": "string$ebnf$1", "symbols": [/[a-zA-Z_]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": function(d) { return d[0].join(""); }},
    {"name": "identifier$ebnf$1", "symbols": [/[a-zA-Z_]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-zA-Z_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"], "postprocess": function(d) {  return d[0] ? d[0].join("") : d; }},
    {"name": "values_list", "symbols": ["value"]},
    {"name": "values_list", "symbols": ["value", {"literal":","}, "values_list"]},
    {"name": "value$subexpression$1", "symbols": ["identifier"]},
    {"name": "value$subexpression$1", "symbols": ["int"]},
    {"name": "value", "symbols": ["value$subexpression$1"], "postprocess": function(d) {  return d[0] ? d[0] : d; }},
    {"name": "binary_expression$ebnf$1", "symbols": ["whitespace"], "postprocess": id},
    {"name": "binary_expression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "binary_expression$ebnf$2", "symbols": ["whitespace"], "postprocess": id},
    {"name": "binary_expression$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "binary_expression", "symbols": ["value", "binary_expression$ebnf$1", "arithmetic_operator", "binary_expression$ebnf$2", "value"], "postprocess":  
        function(d) {
            return { type: 'binaryExpression', operator: d[2][0], left: d[0][0], right: d[4][0] };
        }
        },
    {"name": "arithmetic_operator", "symbols": [{"literal":"+"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"-"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"*"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"/"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"<"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":">"}]},
    {"name": "arithmetic_operator$string$1", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "arithmetic_operator", "symbols": ["arithmetic_operator$string$1"]},
    {"name": "arithmetic_operator$string$2", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "arithmetic_operator", "symbols": ["arithmetic_operator$string$2"]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"="}]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
