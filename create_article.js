console.log("create_article.js 실행중!");

async function handleClick() {
  const title_element = document.querySelector("#title");
  const content_element = document.querySelector("#content");
  const image_element = document.querySelector("#image");

  const title_value = title_element.value;
  const content_value = content_element.value;
  const image = image_element.files[0];

  const formData = new FormData();
  formData.append("title", title_value);
  formData.append("content", content_value);
  formData.append("image", image);

  const response = await postArticle(formData);
  console.log(response);

  location.href = "/index.html";
}
