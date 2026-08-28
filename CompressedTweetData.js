// DBに保存するデータをまとめておくクラス
class CompressedTweetData{
    constructor(key, author, from, to, text) {
        this.key = key;             // ポストのURL
        this.author = author;
        this.from = from;   // ポストの位置
        this.to = to;   // ポストの位置
        this.text = text;
    }
}

export default CompressedTweetData;