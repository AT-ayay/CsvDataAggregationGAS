function totalDataSort(sheet) {
  var lastRow = sheet.getLastRow();
  //追加するSSの最終列を取得
  var lastColumn = sheet.getLastColumn();
   sortRange = sheet.getRange(2, 1, lastRow, lastColumn);
 sortRange.sort({column: lastColumn, ascending: false});
  
}
