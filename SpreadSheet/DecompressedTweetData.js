// スプレッドシートに保存するデータをまとめておくクラス
class DecompressedTweetData{
    constructor(key, from, to, text, reason){
        this.key = key;             // ポストのURL
        this.from = from;   // ポストの位置
        this.to = to;   // ポストの位置
        this.text = text;           // ボスト内容
        this.reason = reason;       // 保留された理由
    }
}

export default DecompressedTweetData;