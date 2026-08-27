import { PREFACTURES, PREFACTURES_SHORT } from "./PrefactureConverters/prefactureLists.js";

const VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const VALID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const VALID_NUMBERS = '0123456789';


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
    return { text: prefix + data };
}

function CreateRandomEntityData() {
    let hashtags = [];
    const fromHashCount = RandomRange(2, 1);
    for (let i = 0; i < fromHashCount; i++) {
        hashtags.push(CreateRandomHashtagDataShort('そばに'));
    }
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