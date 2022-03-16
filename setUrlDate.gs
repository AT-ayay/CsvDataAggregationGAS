//管理シートにURLと変換した日時を追加するメソッド
function setUrlDate(makeUrl,rogSheet) {
  //対象の列の指定
  const TARGET_COLUMN = 'b';
  const TARGET_DATE_COLUMN = 'a'
  // 現在時刻
  var currentTime = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
  //最終行⁺１行目の行数を取得
  var lastRow = rogSheet.getLastRow() + 1;
  //URL記載のセルの指定
  var range = rogSheet.getRange(TARGET_COLUMN + lastRow);
  //タイムスタンプ記載のセルの指定
  var dateRange = rogSheet.getRange(TARGET_DATE_COLUMN + lastRow);
    //空白か判定tureならタイムスタンプ追加
  if (dateRange.isBlank()) {
    dateRange.setValue(currentTime);
  }
  //空白か判定tureならURLを追加
  if (range.isBlank()) {
    range.setValue(makeUrl);
  }
  //ソート機能
  //最終行を取得
  var lastRow = rogSheet.getLastRow();
  //最終列を取得
  var lastColumn = rogSheet.getLastColumn();
  //ソート範囲選択
  let dataSort = rogSheet.getRange(2, 1, lastRow, lastColumn);
  //ソート実施
  dataSort.sort({ column: 1, ascending: false });
}
