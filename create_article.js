console.log("create_article.js 실행중!");

async function handleClick() {
  const title_element = document.querySelector("#title");
  const content_element = document.querySelector("#content");

  const title_value = title_element.value;
  const content_value = content_element.value;

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
  console.log(data);

  location.href = "/index.html";
}
