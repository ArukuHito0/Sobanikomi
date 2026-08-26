// AIandDBmain.js
require("dotenv").config();

// モジュールの読み込み
const { handleTweetData } = require("./DataBaseSender");
//const ComplessedTweetData = require("./ComplessedTweetData");
//const DecompressedTweetData = require("./DecompressedTweetData");   //ここ２つtransformerがあれば不要
const APISender = require("./APISender");
const SpreadSheetAccessor = require("./SpreadSheetAccessor");
const transformer = require("./transformer");
const SearchTweets = require("./main");

// インスタンス化
const apiSender = new APISender();
const spreadsheetAccessor = new SpreadSheetAccessor();

async function processTweetEvaluation() {
  console.log("=== ツイート評価開始 ===");

  try {
    // 1. 本物のツイートを取得
    const targetHashtag = "熊本";
    const tweets = await SearchTweets(targetHashtag).tweets;

    if (tweets.length === 0) {
      console.log("⚠️ 該当するツイートが見つかりませんでした。");
      return;
    }
    for(targetTweet of tweets){
      const tweetText = targetTweet.text;
      
      console.log(`📌 処理対象ツイート [Key: ${key}]`);
      console.log(`本文: "${tweetText}"`);
      
      // 2. Dify APIで評価
      const evaluation = await apiSender.evaluateTweet(tweetText);
      if (!evaluation) {
        throw new Error("❌ 評価結果の取得に失敗しました。");
      }
      
      console.log(`スコア: ${evaluation.score}点 / 理由: ${evaluation.reason}`);
      
      const key =  
      // 3. 80点以上：DBへ保存 / 80点未満：スプレッドシートへ保存
      if (evaluation.score >= 80) {
        const tweetData = TweetsToCompressedTweetData(targetTweet);
        //const tweetData = new ComplessedTweetData(targetTweet.id, fromPref, toPref);  //テスト環境用

        const saveRes = await handleTweetData({
          action: "save",
          ...tweetData
        });

        console.log("✅ DB保存結果:", saveRes);

      } else {
        console.log(`⚠️ スコアが80点未満 (${evaluation.score}点) のため、スプレッドシートへ送信します...`);

        const sheetData = TweetsToDecompressedTweetData(targetTweet);
        /*const sheetData = new DecompressedTweetData(  //テスト環境用
          targetTweet.id,
          fromPref,
          tweetText,
          evaluation.reason
        );
        */
        const sheetSaveRes = await spreadsheetAccessor.SaveToSheet(sheetData);
        console.log("📄 スプレッドシート保存結果:", sheetSaveRes);
      }
    }

  } catch (error) {
    console.error("❌ エラーが発生しました:", error.message);
  }
}

// 実行
processTweetEvaluation();