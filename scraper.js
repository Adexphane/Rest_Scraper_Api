import axios from "axios";
import * as cheerio from "cheerio";

const webScraper = async (url, parseFunction) => {
  try {
    if (!url) {
      console.log("Please provide a url");
    }

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const cher = cheerio.load(data);

    return parseFunction(cher);
  } catch (error) {
    console.log(`Error Scraping ${url}`, error);
  }
};

export default webScraper;
