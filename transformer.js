import DecompressedTweetData from "./SpreadSheet/DecompressedTweetData.js";
import { getShortPrefactureFromPrefacture, isLongPrefacture, isPrefacture, isShortPrefacture } from "./PrefactureConverters/PrefactureConverters.js";
import CompressedTweetData from "./CompressedTweetData.js";
import { UNKNOWN_LOCATION } from "./PrefactureConverters/PrefactureConverters.js";

function GetFromLocationTag(tweets) {
    let location = UNKNOWN_LOCATION;
    for (const hashtag of tweets.entities.hashtags) {
        if (!(isPrefacture(hashtag.text))) continue;
        const region = isLongPrefacture(hashtag.text) ? getShortPrefactureFromPrefacture(hashtag.text) : hashtag.text;
        location = region
        break;
    }
    return location;
}

function GetToLocationTag(tweets, prefix) {
    let location = [];
    for (const hashtag of tweets.entities.hashtags) {
        if (!(hashtag.text.includes(prefix))) continue;
        let prefacture = hashtag.text.replace(prefix, '');
        if (!(isShortPrefacture(prefacture))) continue;
        if (hashtag.text === prefix + prefacture) {
            location.push(prefacture);
        }
    }
    if (location.length === 0) {
        location.push(UNKNOWN_LOCATION);
    }
    return location;
}

export function TweetsToDecompressedTweetData(tweets, reason = 'debug') {
    return new DecompressedTweetData(
        tweets.id,
        tweets.author.userName,
        GetFromLocationTag(tweets),
        GetToLocationTag(tweets, 'そばに'),
        tweets.text,
        reason
    );
}

export function TweetsToCompressedTweetData(tweets) {
    return new CompressedTweetData(
        tweets.id,
        tweets.author.userName,
        GetFromLocationTag(tweets),
        GetToLocationTag(tweets, 'そばに'),
        tweets.text
    );
}