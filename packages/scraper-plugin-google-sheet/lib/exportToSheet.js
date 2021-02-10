const { google } = require('googleapis')
const exec = require('@0y0/exec')
const req = require('./request')

function getSheetSdk(credentials) {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets']
  const auth = new google.auth.GoogleAuth({ credentials, scopes })
  return google.sheets({ version: 'v4', auth })
}

async function getOrCreateSheetId(sdk, spreadsheetId, opt) {
  const sheetByTitle = sheet => sheet?.properties.title === opt.title

  const spreadsheet = await sdk.spreadsheets.get({ spreadsheetId })
  const sheet = spreadsheet.data.sheets.find(sheetByTitle)
  if (sheet) return sheet.properties.sheetId

  const request = req.batchUpdate(spreadsheetId, req.addSheet(opt.title))
  const response = await sdk.spreadsheets.batchUpdate(request)
  const newSheet = response.data.replies.map(r => r.addSheet).find(sheetByTitle)
  return newSheet.properties.sheetId
}

function getHeaderRequest(sheetId, header) {
  const rows = [header]
  return req.updateCells(sheetId, 0, 0, rows)
}

function getBodyRequest(sheetId, body, vars) {
  const rows = exec(body, vars)
  return req.appendCells(sheetId, rows)
}

function appendRows(sdk, spreadsheetId, sheetId, opt, vars) {
  const batchUpdates = []
  if (opt.header) batchUpdates.push(getHeaderRequest(sheetId, opt.header))
  batchUpdates.push(getBodyRequest(sheetId, opt.body, vars))
  const request = req.batchUpdate(spreadsheetId, ...batchUpdates)
  return sdk.spreadsheets.batchUpdate(request)
}

module.exports = async function exportToSheet(credentials, opt, vars) {
  const sdk = getSheetSdk(credentials)
  const sheetId = await getOrCreateSheetId(sdk, opt.spreadsheetId, opt.sheet)
  await appendRows(sdk, opt.spreadsheetId, sheetId, opt.sheet, vars)
}
