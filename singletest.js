require("dotenv").config();

const APISender = require("./APISender");
const DataBaseSender = require("./DataBaseSender");

const apiSender = new APISender();

async function SendAItest() {
    const testString = 'みんな暑くて大変だろうけど応援しています！';
    const evaluation = await apiSender.evaluateTweet(testString);
  if (!evaluation) {
    console.log("❌ 評価に失敗したためスキップします");
  }

  console.log(`スコア: ${evaluation.score}点 / 理由: ${evaluation.reason}`);

    if(score.score >= 80){
        console.log(`点数:${score.score} なのでDBへ保存します`)
    }else{
        console.log(`点数: ${score.score} なのでDBへ保存しませーーーーーん`);
    }
}

SendAItest();