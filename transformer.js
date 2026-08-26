import DecompressedTweetData from "./SpreadSheet/DecompressedTweetData.js";
import { getShortPrefactureFromPrefacture } from "./PrefactureConverters/PrefactureConverters.js";
import CompressedTweetData from "./CompressedTweetData.js";

function GetToLocationTag(tweets) {
    let location = 'unknown';
    for (const hashtag of tweets.entities.hashtags) {
        const region = getShortPrefactureFromPrefacture(hashtag.text);
        if (region == 'unknown') continue;
        location = region
        break;
    }
    return location;
}

function GetFromLocationTag(tweets, prefix) {
    let location = 'unknown';
    for (let hashtag of tweets.entities.hashtags) {
        if (!(hashtag.text.includes(prefix))) continue;
        let modHashtag = hashtag.text;
        let region = modHashtag.replace(prefix, '');
        if (region == 'unknown') continue;
        if (hashtag.text === prefix + region) {
            location = region
            break;
        }
    }
    return location;
}

export function TweetsToDecompressedTweetData(tweets, reason = 'debug') {
    return new DecompressedTweetData(
        tweets.id,
        GetFromLocationTag(tweets, 'そばに'),
        GetToLocationTag(tweets),
        tweets.text,
        reason
    );
}

export function TweetsToCompressedTweetData(tweets) {
    return new CompressedTweetData(
        tweets.id,
        GetFromLocationTag(tweets, 'そばに'),
        GetToLocationTag(tweets)
    );
}