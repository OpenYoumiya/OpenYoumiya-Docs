export default function remarkCsvTables() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined || node.lang !== "csv") return;

      const rows = parseCsv(node.value);
      if (rows.length < 2) return;

      parent.children[index] = {
        type: "html",
        value: renderTable(rows),
      };
    });
  };
}

function visit(node, type, visitor, parent, index) {
  if (!node || typeof node !== "object") return;
  if (node.type === type) visitor(node, index, parent);
  if (!Array.isArray(node.children)) return;

  for (let childIndex = 0; childIndex < node.children.length; childIndex += 1) {
    visit(node.children[childIndex], type, visitor, node, childIndex);
  }
}

function parseCsv(value) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const next = value[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);

  return rows
    .map((cells) => cells.map((cell) => cell.trim()))
    .filter((cells) => cells.some((cell) => cell.length > 0));
}

function renderTable(rows) {
  const columnCount = Math.max(...rows.map((row) => row.length));
  const [header, ...body] = rows.map((row) => normalizeRow(row, columnCount));

  return [
    '<table class="csv-table">',
    "<thead>",
    `<tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr>`,
    "</thead>",
    "<tbody>",
    ...body.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`),
    "</tbody>",
    "</table>",
  ].join("");
}

function normalizeRow(row, columnCount) {
  return Array.from({ length: columnCount }, (_, index) => row[index] ?? "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("\n", "<br>");
}
