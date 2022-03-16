//管理シート指定
var managementSS = SpreadsheetApp.openById('管理シートのID');
var managementSheet = managementSS.getSheetByName('実行シート名');
var rogSheet = managementSS.getSheetByName('実行ログ名');

//フォーマット変更後のファイルを追加するフォルダ
function main() {
  var result = Browser.msgBox("実行しますか？", Browser.Buttons.OK_CANCEL);//sheetからの使用の場合こちらを有効に
  // var result = "ok";//デバッグ用ボタン回避//HTMLから起動するライブラリ使用コード
  if (result == "ok") {
    //管理シート記載のシートID、シート名が適切か判定するメソッド呼び出し;
    //戻り値:check=TUREorFALSE,
    //sourceFolder=エクセルファイルを入れるフォルダ指定,
    //opedernAdditionSheet=入れ替え対象スプレットシートのシート情報(配列)
    var [check, sourceFolder,destFolder, openAdditionSheet] = checkPassAndName(managementSheet);

    //Logger.log(check); Logger.log(sourceFolder); Logger.log(openAdditionSheet);//デバック用
    //checkPassAndNameメソッドの戻り値を利用して実行判定
    if (check) {
      // Excelファイルを変数に保存
      const excelFiles = sourceFolder.getFiles();
      // 変換されたファイルが格納されるフォルダをidによって取得(管理シート修正に伴い不使用)
     // const destFolder = DriveApp.getFolderById(destFolderId);

      // Excelファイルをイテレートして順にスプレッドシートに変換
      while (excelFiles.hasNext()) {
        var file = excelFiles.next();
        //変換し登録するメソッド呼び出し ;  戻り値:変換後のSSのURL
        var makeUrl = convertToSpreadsheet(file, destFolder);
        //管理シートにURLと変換した日時を追加するメソッド呼び出し
        setUrlDate(makeUrl, rogSheet);
        //集計データシートに追加、ソート、重複削除メソッド呼び出し
        totalDataMake(makeUrl, openAdditionSheet);//集計データいらないかも
        //最新データシートのクリア、データ追加メソッド呼び出し
        //newDataCopy(makeUrl, openAdditionSheet);
      }
      //変換後削除するメソッド呼び出し
      delExcelFile(sourceFolder);
    }
  }
  //HTMLから起動するライブラリ使用コード
  //return check;
}
