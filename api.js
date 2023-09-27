console.log("api.js 실행중!");

const base_url = "http://127.0.0.1:8000";

async function getArticles() {
  const response = await fetch(`${base_url}/articles/`);
  const data = await response.json();

  return data;
}

async function postArticle(title_value, content_value) {
  const response = await fetch("http://127.0.0.1:8000/articles/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title_value,
      content: content_value,
    }),
  });

  const data = await response.json();

  return data;
}
