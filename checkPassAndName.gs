function checkPassAndName(managementSheet) {
  //.push()でエラーログを格納
  var logList = [];
  //入れ替え対象スプレットシートのシート情報(配列)
  var openAdditionSheet = [];
  //メインプログラム実行可否判定エラーがあればFalseに変更
  var check = true;

  //追加元フォルダの判定
  try {
    //管理表のデータを配列にして格納
    var checkfolderID = managementSheet.getRange(2, 1).getValues();
    // Excelファイルが入っているフォルダをidによって取得
    var sourceFolder = DriveApp.getFolderById(checkfolderID);
  } catch (e) {
    check = false;
    logList.push("\\n変換元フォルダを確認してください");
    Logger.log(logList);
  }
    //追加先フォルダの判定
  try {
    //管理表のデータを配列にして格納
    var destFolderID = managementSheet.getRange(2,2).getValues();
    // Excelファイルが入っているフォルダをidによって取得
    var destFolder = DriveApp.getFolderById(destFolderID);
  } catch (e) {
    check = false;
    logList.push("\\n変換先フォルダを確認してください");
    Logger.log(logList);
  }

  //管理シート最終行を取得//Rangeの開始位置の-1分引くと範囲指定できる
  // var managementLastRow = managementSheet.getLastRow() - 3;
  //管理表のデータを配列にして格納
  var checkPass = managementSheet.getRange(4, 1, 1, 2).getValues();
  Logger.log(checkPass);
  //シートを開いて判定
  //for (let i = 0; i < checkPass.length; i++) {
    //スプレットシートIDの確認
    const i =0;
    try {
      var sheetID = checkPass[i][0];
      var openAdditionSS = SpreadsheetApp.openById(sheetID);
      //シート名の確認
      var sheetName = checkPass[i][1];
      var openAdditionSheet = openAdditionSS.getSheetByName(sheetName);
      //シート名が合致するか判定処理
      if (openAdditionSheet == null) {
        logList.push("\\n" + (i + 4) + "行目のシート名を確認してください");
        check = false;
      }
      //スプレットシートIDで開けなければエラーになるためcatchで拾う
    } catch (e) {
      logList.push("\\n" + (i + 4) + "行目のスプレットシートIDを確認してください");
     // openAdditionSheet.push("error");//数合わせ
      Logger.log(logList);
      check = false;
    }
  //}
  //tureであればエラーメッセージを表示しないfalseであれば表示
  if (check) {
  } else {
    Browser.msgBox(logList);
  }
  return [check, sourceFolder,destFolder, openAdditionSheet];
}
