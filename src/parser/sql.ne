@builtin "number.ne"
@builtin "string.ne"
@builtin "whitespace.ne"

main -> select {% function(d) { return d[0]; } %}
select -> select_keyword whitespace column_list whitespace from_clause select_clauses:? {% 
                    function(d) {
                        return { type: 'select', cols: d[2], from: d[4], clauses: d[5] }; 
                    } 
%}
from_clause -> "FROM" whitespace table_name {% function(d) { return { type: 'from', tables: d[2] }; } %}
column_list -> (column_alias | "*" | column) {% function(d) { return { type: 'columnList', cols: d[0] }; } %}
column_alias -> column whitespace "AS"i whitespace column{% function(d) { return { type: 'col', name: d[0].name, alias: d[4].name }; } %}
column -> identifier{% function(d) { return { type: 'column', name: d[0], alias: d[0] }; } %}
table_name -> identifier

select_clauses -> (where_clause | group_by_clause | having_clause | order_by_clause)
where_clause -> whitespace where_keyword whitespace clause {% function(d) { return { type: 'where', clauses: d[3] }  } %}
group_by_clause -> whitespace group_keyword whitespace clause {% function(d) { return { type: 'groupBy', clauses: d[3] }  } %}
having_clause -> whitespace having_keyword whitespace clause {% function(d) { return { type: 'having', clauses: d[3] }  } %}
order_by_clause -> whitespace order_keyword whitespace clause {% function(d) { return { type: 'orderBy', cols: d[3] }  } %}

select_keyword -> "SELECT"i
where_keyword -> "WHERE"i
group_keyword -> "GROUP BY"i
having_keyword -> "HAVING"i
order_keyword -> "ORDER BY"i

whitespace -> __
int -> [0-9]:+
string -> [a-zA-Z]:+{% function(d) { return d[0].join(""); } %}
identifier -> [a-zA-Z]:+ int{% function(d) {  return d[0] ? d[0].join("") : d; } %}
clause -> string