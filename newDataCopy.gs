function newDataCopy(makeUrl, openAdditionSheet) {
  //ID抽出
  var SSID = makeUrl.split("/d/")[1].split("/")[0];
  //追加するSS
  var openSS = SpreadsheetApp.openById(SSID);
  var openSheet = openSS.getSheets()[0];
  //最終行を取得
  var lastRow = openSheet.getLastRow();
  //最終列を取得
  var lastColumn = openSheet.getLastColumn();
  //貼り付けるセルの範囲指定とコピー
  var copyValue = openSheet.getRange(2, 1, lastRow, lastColumn).getValues();
  
  //シートを開く
  for (let i = 0; i < openAdditionSheet.length; i++) {
    //追加対象SSの最終行を取得
    var addLastRow = openAdditionSheet[i].getLastRow();
    //追加対象SSの最終列を取得
    var addLastColumn = openAdditionSheet[i].getLastColumn();
    //Logger.log(openAdditionSheet[i].getRange(2, 1).isBlank());
    //過去データの削除
    if (openAdditionSheet[i].getRange(2, 1).isBlank() == false) {
      openAdditionSheet[i].getRange(2, 1, addLastRow, addLastColumn).clear();
    }
    //最終行を再取得
    addLastRow = openAdditionSheet[i].getLastRow();
    //空白判定用範囲選択
    var range = openAdditionSheet[i].getRange(addLastRow + 1, 1);
    if (range.isBlank()) {
      //自分のシートにコピーした値を全範囲をペースト
      openAdditionSheet[i].getRange(addLastRow + 1, 1, lastRow, lastColumn).setValues(copyValue);
    }
  }
}

