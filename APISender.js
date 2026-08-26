//.envに保存されたAPIキーの取得
require('dotenv').config();

class APISender{
    constructor(){
        this.apiKey = process.env.DIFY_API_KEY;
        this.apiUrl = process.env.DIFY_API_URL|| 'https://api.dify.ai/v1/workflows/run';
    }

    /**
   * ツイートテキストをDify APIに送信し、評価結果（スコアと理由）を取得する
   * @param {string} tweetText - 評価対象のツイート本文
   * @returns {Promise<{score: number, reason: string} | null>}
   */
  async evaluateTweet(tweetText) {
    if (!this.apiKey) {
      console.error("❌ エラー: DIFY_API_KEY が .env に設定されていません。");
      return null;
    }

    console.log("📡 Dify APIへ送信中...");

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: { tweet_text: tweetText },
          response_mode: "blocking",
          user: "test-runner-001"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error [${response.status}]: ${errorText}`);
      }

      const data = await response.json();
      const outputs = data?.data?.outputs;

      if (!outputs) {
        throw new Error("Difyからの出力形式が不正です（outputsが見つかりません）。");
      }

      return {
        score: Number(outputs.score) || 0,
        reason: outputs.reason || ''
      };

    } catch (error) {
      console.error("❌ APISender エラー:", error.message);
      return null;
    }
  }
}


module.exports = APISender;