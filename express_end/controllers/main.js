const { createPool } = require("mysql2");

const createConnection = createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  connectionLimit: 10,
  database: "world",
});

let generatedHtml = ` <h1>Your database</h1>
<table style=" border-collapse: collapse;">
#data
</table>`;

let tableItems = function (field1, field2, field3) {
  return ` <tr>
<td style="border: 1px solid black; padding:4px">${field1}</td>
<td style="border: 1px solid black; padding:4px">${field2}</td>
<td style="border: 1px solid black; padding:4px">${field3}</td>
</tr>`;
};

let tableStruc = `<tr>
<th style="border: 1px solid black; padding:4px;">ID</th>
<th style="border: 1px solid black; padding:4px;">admin_name</th>
<th style="border: 1px solid black; padding:4px;">admin_password</th>
</tr>`;
