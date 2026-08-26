import { getRomajiFromShortPrefacture } from "./PrefactureConverters/PrefactureConverters.js";
import { CreateTestResult } from "./testGenerator.js";
import { TweetsToCompressedTweetData, TweetsToDecompressedTweetData } from "./transformer.js";

const result = CreateTestResult(10);
let dtdData = [];
let ctdData = [];
if (result.success) {
    for (let i = 0; i < result.tweets.length; i++) {
        const tweets = result.tweets[i];
        const dtd = TweetsToDecompressedTweetData(tweets);
        const ctd = TweetsToCompressedTweetData(tweets);
        dtdData.push(dtd);
        ctdData.push(ctd);
    }
    console.dir(dtdData, {depth: null});
    console.dir(ctdData, {depth: null});
} else {
    console.dir(result, {depth: null});
}