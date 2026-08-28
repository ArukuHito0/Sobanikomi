// AIandDBmain.js
import * as dotenv from 'dotenv';
dotenv.config();

// モジュールの読み込み
import { handleTweetData } from "./DataBaseSender.js";
import APISender from "./APISender.js";
import SpreadSheetAccessor from "./SpreadSheet/SpreadSheetAccessor.js";
import { TweetsToCompressedTweetData, TweetsToDecompressedTweetData } from "./transformer.js";

// インスタンス化
const apiSender = new APISender();
const spreadsheetAccessor = new SpreadSheetAccessor();

export async function ProcessTweetEvaluation(tweets) {
  console.log("=== ツイート評価開始 ===");
  let pendingData = [];

  try {
    if (tweets.length === 0) {
      console.log("⚠️ 該当するツイートが見つかりませんでした。");
      return;
    }
    for(let targetTweet of tweets){
      const tweetText = targetTweet.text;
      
      console.log(`📌 処理対象ツイート [Key: ${targetTweet.id}]`);
      console.log(`本文: "${tweetText}"`);
      
      // 2. Dify APIで評価
      const evaluation = await apiSender.evaluateTweet(tweetText);
      if (!evaluation) {
        throw new Error("❌ 評価結果の取得に失敗しました。");
      }
      
      console.log(`スコア: ${evaluation.score}点 / 理由: ${evaluation.reason}`);
      
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
        pendingData.push(TweetsToDecompressedTweetData(targetTweet));
      }
    }

    return pendingData;

  } catch (error) {
    console.error("❌ エラーが発生しました:", error.message);
  }
}

// 実行
// processTweetEvaluation();