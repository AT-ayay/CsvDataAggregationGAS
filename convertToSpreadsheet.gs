//変換し登録するメソッド
function convertToSpreadsheet(file, destFolder) {
  // 各種オプションを設定
  // mimeTypeをスプレッドシートにすることで変換される
  options = {
    title: file.getName(),
    mimeType: MimeType.GOOGLE_SHEETS,
    parents: [{ id: destFolder.getId() }]
  };
  // Drive APIへfileをPOSTする
  var cv_sheet = Drive.Files.insert(options, file.getBlob());
  Logger.log(cv_sheet.alternateLink);//デバッグ用
  //URLのリターン
  return cv_sheet.alternateLink;
}