// DBに保存するデータをまとめておくクラス
class CompressedTweetData{
    constructor(key, from, to){
        this.key = key;             // ポストのURL
        this.fromLocation = from;   // ポストの位置
        this.toLocation = to;   // ポストの位置
    }
}

export default CompressedTweetData;