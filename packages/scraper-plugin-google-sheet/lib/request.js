function batchUpdate(spreadsheetId, ...requests) {
  return { spreadsheetId, requestBody: { requests } }
}

function addSheet(title) {
  return { addSheet: { properties: { title } } }
}

function updateRows(rows) {
  return {
    fields: 'userEnteredValue',
    rows: rows.map(columns => ({
      values: columns.map(cell => ({
        userEnteredValue: { stringValue: cell }
      }))
    }))
  }
}

function appendCells(sheetId, rows) {
  return { appendCells: { sheetId, ...updateRows(rows) } }
}

function updateCells(sheetId, rowIndex, columnIndex, rows) {
  const start = { sheetId, rowIndex, columnIndex }
  return { updateCells: { start, ...updateRows(rows) } }
}

module.exports = {
  batchUpdate,
  addSheet,
  appendCells,
  updateCells
}
