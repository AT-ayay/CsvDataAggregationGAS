function totalDataMake(makeUrl, openAdditionSheet) {
  //ID抽出
  var SS_ID = makeUrl.split("/d/")[1].split("/")[0];
  Logger.log(SS_ID);//デバッグ用
  //追加するSS
  var openSS = SpreadsheetApp.openById(SS_ID);
  // var openSS = SpreadsheetApp.openById('1ynHFiw88e-Wa_j4cdy-bn4dNzHox_CyGRR5m58xP7aU');//デバッグ用
  var openSheet = openSS.getSheets()[0];
  //追加対象SS

  //追加するSSの最終行を取得
  var lastRow = openSheet.getLastRow();
  //追加するSSの最終列を取得
  var lastColumn = openSheet.getLastColumn();
  //追加するSSの貼り付けるセルの範囲指定とコピー
  var copyValue = openSheet.getRange(2, 1, lastRow, lastColumn).getValues();


  Logger.log(openAdditionSheet);//デバッグ用
  //追加されるSSの最終行を取得
  var addLastRow = openAdditionSheet.getLastRow() + 1;
  //空白判定用範囲選択
  var range = openAdditionSheet.getRange(addLastRow, 1);
  if (range.isBlank()) {
    //自分のシートにコピーした値を全範囲をペースト
    openAdditionSheet.getRange(addLastRow, 1, lastRow, lastColumn).setValues(copyValue);
    var newDataCheck = openAdditionSheet.getRange(addLastRow, lastColumn + 1, lastRow - 1, 1);
    newDataCheck.setValue("〇");
  }
  //ソート機能
  totalDataSort(openAdditionSheet);

  //最終行を取得
  addLastRow = openAdditionSheet.getLastRow();
  //最終列を取得
  addLastColumn = openAdditionSheet.getLastColumn();
  //案件Noをもとに重複削除
  openAdditionSheet.getRange(2, 1, addLastRow, addLastColumn).removeDuplicates([1]);
  //追加した〇を削除
  openAdditionSheet.deleteColumn(addLastColumn);

  //最終行を再取得
  addLastRow = openAdditionSheet.getLastRow();
  //最終列を再取得
  addLastColumn = openAdditionSheet.getLastColumn();
   //ソート範囲選択
  let dataSort = openAdditionSheet.getRange(2, 1, addLastRow, addLastColumn);
    //ソート実施
  dataSort.sort({ column: 1, ascending: false });
}