import React, { useEffect, useState } from "react";
import "./index.css";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiKeyLocalTest = "a93d9d3ab51c4dcca78a2a97e0703167";
    const apiKey = process.env.NEWS_API_KEY; //&& apiKeyLocalTest;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    //   "apiKey=a93d9d3ab51c4dcca78a2a97e0703167";

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        setNewsData(data.articles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Filter the news articles to get only the ones with images
  const newsWithImages = newsData.filter((news) => news.urlToImage);

  // Sort the news articles by publishedAt in descending order
  const sortedNews = newsWithImages.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  // Get the first 4 most important news articles with images
  const mostImportantNews = sortedNews.slice(0, 3);

  return (
    <div className="news-container">
      {mostImportantNews.map((news, index) => (
        <div className="news-card" key={index}>
          <h5 className="news-title">{news.title}</h5>
          <img src={news.urlToImage} alt={news.title} className="news-image" />
          <p className="news-description">{news.description}</p>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-link"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
