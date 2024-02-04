// Call Apis
async function Fetch_URL(Api_Link) {
  try {
    const respone = await fetch(Api_Link);
    if (!respone.ok) {
      throw new Error("--Unknow Error");
    }
    const jsonFormate = await respone.json();
    const filterQuotes = jsonFormate.quotes.map((elements) => {
      const result = elements.quote;
      return result;
    });
    filterQuotes.unshift(undefined);
    return filterQuotes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const testText = Fetch_URL("https://dummyjson.com/quotes?limit=10");
const test2Text = Fetch_URL("https://dummyjson.com/quotes?limit=10&skip=10");
export { testText, test2Text };
