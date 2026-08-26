import DecompressedTweetData from "./DecompressedTweetData.js";

class AccessorDebug{
    constructor(accessor){
        this.accessor = accessor;
    }

    async SpreadSheetLoad(key) {
        console.log((await this.accessor.LoadFromSheet(key)));
    }

    async SpreadSheetSave(data) {
        console.log((await this.accessor.SaveToSheet(data)));
    }

    CreateTweetData(key, location, text, reason) {
        return new DecompressedTweetData(key, location, text, reason);
    }
}

module.exports = AccessorDebug;