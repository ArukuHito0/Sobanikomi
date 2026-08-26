const dictionary_prefacture_to_region = {
北海道: '北海道',
青森: '東北', 岩手: '東北', 秋田: '東北', 宮城: '東北', 山形: '東北', 福島: '東北',
東京: '関東', 神奈川: '関東', 埼玉: '関東', 千葉: '関東', 茨城: '関東', 栃木: '関東', 群馬: '関東', 山梨: '関東',
新潟: '信越', 長野: '信越',
富山: '北陸', 石川: '北陸', 福井: '北陸',
愛知: '東海', 岐阜: '東海', 静岡: '東海', 三重: '東海',
大阪: '近畿', 兵庫: '近畿', 京都: '近畿', 滋賀: '近畿', 奈良: '近畿', 和歌山: '近畿',
鳥取: '中国', 島根: '中国', 岡山: '中国', 広島: '中国', 山口: '中国',
徳島: '四国', 香川: '四国', 愛媛: '四国', 高知: '四国',
福岡: '九州', 佐賀: '九州', 長崎: '九州', 熊本: '九州', 大分: '九州', 宮崎: '九州', 鹿児島: '九州',
沖縄: '沖縄',
}

const dictionary_prefacture_to_romaji = {
北海道: 'hokkaido',
青森: 'aomori', 岩手: 'iwate', 秋田: 'akita', 宮城: 'miyagi', 山形: 'yamagata', 福島: 'fukushima',
東京: 'tokyo', 神奈川: 'kanagawa', 埼玉: 'saitama', 千葉: 'chiba', 茨城: 'ibaraki', 栃木: 'tochigi', 群馬: 'gunma', 山梨: 'yamanashi', 
新潟: 'niigata', 長野: 'nagano', 
富山: 'toyama', 石川: 'ishikawa', 福井: 'fukui', 
愛知: 'aichi', 岐阜: 'gifu', 静岡: 'shizuoka', 三重: 'mie', 
大阪: 'osaka', 兵庫: 'hyogo', 京都: 'kyoto', 滋賀: 'shiga', 奈良: 'nara', 和歌山: 'wakayama', 
鳥取: 'tottori', 島根: 'shimane', 岡山: 'okayama', 広島: 'hiroshima', 山口: 'yamaguchi', 
徳島: 'tokushima', 香川: 'kagawa', 愛媛: 'ehime', 高知: 'kochi', 
福岡: 'fukuoka', 佐賀: 'saga', 長崎: 'nagasaki', 熊本: 'kumamoto', 大分: 'oita', 宮崎: 'miyazaki', 鹿児島: 'kagoshima', 
沖縄: 'okinawa'
}

const UNKNOWN_LOCATION = 'unknown';

export function getShortPrefactureFromPrefacture(prefacture) {
    const shortKey = prefacture.replace(/(都|府|県)$/, '');
    if (shortKey in dictionary_prefacture_to_region) return shortKey;
    return UNKNOWN_LOCATION;
}

// / 都道府県から地方へ変換
// / 例:
// / 三重県 = '近畿'
// / 三重 = '近畿'˜
// / アメリカ = 'unknown'
export function getRegionFromPrefacture(prefactureKey) {
    const shortKey = getShortPrefactureFromPrefacture(prefactureKey);
    if (shortKey in dictionary_prefacture_to_region) return dictionary_prefacture_to_region[shortKey];
    return UNKNOWN_LOCATION;
}

export function getRomajiFromShortPrefacture(shortPrefacture) {
    if (shortPrefacture in dictionary_prefacture_to_romaji) return dictionary_prefacture_to_romaji[shortPrefacture];
    return UNKNOWN_LOCATION;
}

export function getRomajiFromPrefacture(prefactureKey) {
    const shortKey = getShortPrefactureFromPrefacture(prefactureKey);
    return getRomajiFromShortPrefacture(shortKey);
}