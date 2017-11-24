@builtin "whitespace.ne"

main -> (select | create | insert) {% function(d) { return d[0]; } %}
select -> select_keyword whitespace column_list whitespace from_clause select_clauses:? {% 
    function(d) {
        return { type: 'select', cols: d[2], from: d[4], clauses: d[5] }; 
    } 
%}
create -> create_table_keyword whitespace table_name whitespace:? "(" column_defs whitespace:? ")" {%
    function(d) {
        return { type: 'create_table', name: d[2], columns: d[5] }; 
    }
%}
insert -> insert_keyword whitespace table_name whitespace:? "(" column:+ ")" values_keyword  {%
    function(d) {
        return { type: 'insert', table: d[2], columns: [] }; 
    }
%}

from_clause -> from_keyword whitespace table_name {% function(d) { return { type: 'from', tables: d[2] }; } %}
column_list -> (column_alias | "*" | column) {% function(d) { return { type: 'columnList', cols: d[0] }; } %}
column_alias -> column whitespace "AS"i whitespace column{% function(d) { return { type: 'col', name: d[0].name, alias: d[4].name }; } %}
column -> identifier{% function(d) { return { type: 'column', name: d[0], alias: d[0] }; } %}
column_defs -> (column_def ",":?):+ {% 
    function(d) {
        return d[0][0];
    }
%}
column_def -> identifier whitespace data_type {%
    function(d) {
        return { type: 'col', name: d[0], alias: d[0], data: d[2] };
    }
%}
data_type -> "INT"i | "FLOAT"i | "TEXT"i | "DATE"i | "DATETIME"i | "TIMESTAMP"i | "TIME"i | "YEAR"i {% 
    function(d) {
        return d[0];
    }
%}
table_name -> identifier

select_clauses -> (where_clause | group_by_clause | having_clause | order_by_clause)
where_clause -> whitespace where_keyword whitespace binary_expression {% function(d) { return { type: 'where', clauses: d[3] }  } %}
group_by_clause -> whitespace group_keyword whitespace values_list {% function(d) { return { type: 'groupBy', clauses: d[3] }  } %}
having_clause -> whitespace having_keyword whitespace binary_expression {% function(d) { return { type: 'having', clauses: d[3] }  } %}
order_by_clause -> whitespace order_keyword whitespace values_list {% function(d) { return { type: 'orderBy', cols: d[3] }  } %}

select_keyword -> "SELECT"i
where_keyword -> "WHERE"i
group_keyword -> "GROUP BY"i
having_keyword -> "HAVING"i
order_keyword -> "ORDER BY"i
from_keyword -> "FROM"i
create_table_keyword -> "CREATE TABLE"i
values_keyword -> "VALUES"i
insert_keyword -> "INSERT INTO"i

whitespace -> __
int -> [0-9]:+
string -> [a-zA-Z_]:+ {% function(d) { return d[0].join(""); } %}
identifier -> [a-zA-Z_]:+ {% function(d) {  return d[0] ? d[0].join("") : d; } %}
values_list -> value | value "," values_list
value -> (identifier | int)  {% function(d) {  return d[0] ? d[0] : d; } %}
binary_expression -> value whitespace:? arithmetic_operator whitespace:? value {% 
    function(d) {
        return { type: 'binaryExpression', operator: d[2][0], left: d[0][0], right: d[4][0] };
    }
%}
arithmetic_operator -> "+" | "-" | "*" | "/" | "<" | ">" | "<=" | ">=" | "="