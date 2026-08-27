import DecompressedTweetData from "./DecompressedTweetData.js";

// スプレッドシートに対して操作を行うクラス
class SpreadSheetAccessor{
    constructor(sheetName, sheetUrl){
        this.sheetName = sheetName;
        this.sheetUrl = sheetUrl;
    }

    // デプロイのURL
    static deploy_url = "https://script.google.com/macros/s/AKfycbwj6gic29VTP18_KTQ8vnNOLwAF1EBi8Kkh1jGg3GR1EY_BjvXNoefXpyGINcYSfB7w/exec";

    // 指定のスプレッドシートの指定のデータを取得する関数
    async LoadFromSheet(key) {
        const params = new URLSearchParams();

        params.append("sheetUrl", this.sheetUrl);
        params.append("sheetName", this.sheetName);
        params.append("key", key);

        // 指定のポストのデータを取得するGASを呼び出す
        const response = await fetch(
            `${SpreadSheetAccessor.deploy_url}?${params.toString()}`,
            {
                method: "GET"
            }
        );

        if(!response.ok){
            throw new Error(`GASからの取得に失敗：${response.status}`);
        }

        const result = await response.json();   // GASから返ってきたJSONデータを受け取る

        if(!result.success){
            throw new Error(result.message);
        }

        // 取得したJSONデータをクラスオブジェクトにインスタンス化し返す
        return new DecompressedTweetData(
            result.key,
            result.location,
            result.text,
            result.reason
        )
    }

    // 指定のスプレッドシートのデータを更新する関数
    async SaveToSheet(data) {
        const params = new URLSearchParams();

        params.append("sheetUrl", this.sheetUrl);
        params.append("sheetName", this.sheetName);
        params.append("tweets", JSON.stringify(data));

        // GASのデプロイにアクセスしてデータを送る
        const response = await fetch(SpreadSheetAccessor.deploy_url, {
            method: "POST",
            body: params
        });

        // 送信に失敗したらエラーを投げる
        if(!response.ok){
            throw new Error(`GASへの送信に失敗：${response.status}`);            
        }

        return new Promise((resolve, reject) => {
            resolve("GASへの送信に成功");
        }) 
    }
}

export default SpreadSheetAccessor;