const VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const VALID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const VALID_NUMBERS = '0123456789';
const PREFACTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
const PREFACTURES_SHORT = ['北海道','青森','岩手','宮城','秋田','山形','福島','茨城','栃木','群馬','埼玉','千葉','東京','神奈川','新潟','富山','石川','福井','山梨','長野','岐阜','静岡','愛知','三重','滋賀','京都','大阪','兵庫','奈良','和歌山','鳥取','島根','岡山','広島','山口','徳島','香川','愛媛','高知','福岡','佐賀','長崎','熊本','大分','宮崎','鹿児島','沖縄'];


function RandomRange(max, min = 0) {
    if (isNaN(min) || isNaN(max)) throw Error('Input is NaN');
    return Math.floor((Math.random() * max) + min);
}

function GetRandomFromString(string) {
    if (typeof string === 'number') throw Error('string is number');
    return string.charAt(Math.floor(Math.random() * string.length));
}

function GetRandomStringFromString(string, length) {
    if (isNaN(length)) throw Error('length is NaN');
    if (typeof string === 'number') throw Error(`string is number: input: ${string}`);

    let text = '';
    for (let i = 0; i < length; i++) {
        text += GetRandomFromString(string);
    }
    return text;
}

function RandomNumberString(length) {
    return GetRandomStringFromString(VALID_NUMBERS, length);
}

function RandomString(length) {
    return GetRandomStringFromString(VALID_CHARACTERS, length);
}

function RandomText(length) {
    if (isNaN(length)) throw Error('Input is NaN');
    let text = '';
    let nextSpace = 5;
    for (let i = 0; i < length; i++) {
        if (i == nextSpace) {
            text += ' ';
            nextSpace += RandomRange(1, 13);
            continue;
        }
        text += GetRandomFromString(VALID_ALPHABET);
    }
    return text;
}

function CreateRandomAuthorData() {
    return {
        type: 'user',
        userName: RandomString(RandomRange(32)),
        id: RandomNumberString(16)
    };
}

function CreateRandomHashtagDataShort(prefix = '') {
    let data = PREFACTURES_SHORT[Math.floor(Math.random() * PREFACTURES_SHORT.length)];
    return { text: prefix + data };
}

function CreateRandomHashtagData(prefix = '') {
    let data = PREFACTURES[Math.floor(Math.random() * PREFACTURES.length)];
    if (RandomRange(3) == 0) {
        data += 'a';
    }
    return { text: prefix + data };
}

function CreateRandomEntityData() {
    let hashtags = [];
    hashtags.push(CreateRandomHashtagDataShort('そばに'));
    hashtags.push(CreateRandomHashtagData());
    return { hashtags: hashtags };
}

function CreateRandomTweetsData() {
    const author = CreateRandomAuthorData();
    const id = RandomNumberString(16);
    return {
        type: 'tweet',
        id: id,
        url: `https://x.com/${author.userName}/status/${id}`,
        text: RandomText(RandomRange(5,140)),
        author: author,
        entities: CreateRandomEntityData()
    };
}

function CreateTweetDatas(count) {
    if (isNaN(count)) throw Error('count is NaN');
    let tweets = [];
    for (let i = 0; i < count; i++) {
        tweets.push(CreateRandomTweetsData());
    }
    return tweets;
}

export function CreateTestResult(count) {
    let result = {success: false}
    try {
        result.success = true;
        result.tweets = CreateTweetDatas(count);
    } catch (e) {
        result.success = false;
        result.error = 400;
        result.message = e;
    }
    return result;
}