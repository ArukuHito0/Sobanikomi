//const SpreadSheetAccessor = require(`./SpreadSheetAccessor.js`);
//const AccessorDebug = require(`./AccessorDebug.js`);

import { PREFACTURES_SHORT } from "./testGenerator.js";
import SpreadSheetAccessor from "./SpreadSheet/SpreadSheetAccessor.js";
import {CreateTestResult} from "./testGenerator.js";
import {ProcessTweetEvaluation} from "./AIandDBmain.js";
import { SearchTweet } from "./SearchTweet.js";


const test_sheet_name = "Test";
const test_sheet_url = "https://docs.google.com/spreadsheets/d/1hFigbIB55WYJDaMAgeQ9Iv8ityWfqsQ4-27gfjvO3wo/edit?gid=0#gid=0";

let accessor = new SpreadSheetAccessor(test_sheet_name, test_sheet_url);

function CreateHashtags(){
    let hastags = '';
    for (let prefacture of PREFACTURES_SHORT) {
        hastags += `#そばに${prefacture} `;
    }
    return hastags;
}

const today = new Date();

let result = await SearchTweet(CreateHashtags() + `since:${Math.round(today.getTime() / 1000) - 86400}`);

console.log(result);
let datas = await ProcessTweetEvaluation(result.tweets);
accessor.SaveToSheet(datas);