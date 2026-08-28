export async function SearchTweet(searchKey) {
    const url = new URL("https://api.twitterapi.io/twitter/tweet/advanced_search");
    
    // 今日の日付を取得
    const today = new Date();
    
    url.searchParams.set("query", `${searchKey}`);
    url.searchParams.set("queryType", "Latest");
    
    const response = await fetch(url, {
        headers: {
            "X-API-Key": "new1_d55d5810f544419f86f29c9deedb418a"
        }
    });
    
    if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }
    
    return await response.json();
}