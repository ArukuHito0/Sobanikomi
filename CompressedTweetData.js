// DBに保存するデータをまとめておくクラス
class CompressedTweetData{
    constructor(key, from, to){
        this.key = key;             // ポストのURL
        this.from = from;   // ポストの位置
        this.to = to;   // ポストの位置
    }
}

export default CompressedTweetData;