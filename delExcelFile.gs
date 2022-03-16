//変換後削除するメソッド
function delExcelFile(sourceFolder) {
  // const sourceFolder = DriveApp.getFolderById(sourceFolderId);デバッグ用
  //myFunctionで取得しておいたファイルをすべて参照
  const delfiles = sourceFolder.getFiles();
  //参照済みのファイルがなくなるまでループ
  while (delfiles.hasNext()) {
    //未参照のファイルを１つずつピックアップ
    const delfile = delfiles.next();
    //ピックアップしたファイルからファイルＩＤを参照
    const delId = delfile.getId();
    //DriveAppクラスから上記で参照したファイルIDでファイル一意に取得する
    var delFileData = DriveApp.getFileById(delId);
    //IDから取得したファイルをゴミ箱のフラグをtrueにする
    delFileData.setTrashed(true);
  }
}