//const SpreadSheetAccessor = require(`./SpreadSheetAccessor.js`);
//const AccessorDebug = require(`./AccessorDebug.js`);

import SpreadSheetAccessor from "./SpreadSheet/SpreadSheetAccessor.js";
import AccessorDebug from "./SpreadSheet/AccessorDebug.js";

const test_sheet_name = "Test";
const test_sheet_url = "https://docs.google.com/spreadsheets/d/1hFigbIB55WYJDaMAgeQ9Iv8ityWfqsQ4-27gfjvO3wo/edit?gid=0#gid=0";

var accessorDebug = new AccessorDebug(new SpreadSheetAccessor(test_sheet_name, test_sheet_url));

// async function SerchTweets(hashtag) {
//     const url = new URL("https://api.twitterapi.io/twitter/tweet/advanced_search");

//     // 今日の日付を取得
//     const today = new Date();

//     url.searchParams.set("query", `#${hashtag} since:${Math.round(today.getTime() / 1000)}`);
//     url.searchParams.set("queryType", "Latest");

//     const response = await fetch(url, {
//         headers: {
//             "X-API-Key": "new1_d55d5810f544419f86f29c9deedb418a"
//         }
//     });

//     if(!response.ok){
//         throw new Error(`HTTP error: ${response.status}`);
//     }

//     return await response.json();
// }