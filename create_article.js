console.log("create_article.js 실행중!");

async function handleClick() {
  const title_element = document.querySelector("#title");
  const content_element = document.querySelector("#content");

  const title_value = title_element.value;
  const content_value = content_element.value;

  const response = await postArticle(title_value, content_value);
  console.log(response);

  location.href = "/index.html";
}
