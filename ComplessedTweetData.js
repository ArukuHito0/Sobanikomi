//DB(supabase)に保存するデータをまとめるクラス
//transformerがあれば不要
class ComplessedTweetData{
    constructor(key, FromLocation, ToLocation){
        this.key = key;     //ポストURL
        this.FromLocation = FromLocation;       //ポストの発信先
        this.ToLocation = ToLocation;       //ポストの発信地
    }
}

module.exports = ComplessedTweetData;