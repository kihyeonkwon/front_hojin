console.log("detail.js 실행중!");

function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");

  return myParam;
}

async function loadArticle() {
  const id = getId();
  const response = await fetch(`http://127.0.0.1:8000/articles/${id}/`);

  console.log(response);

  const data = await response.json();
  console.log(data);

  const article = document.querySelector("#article");

  const title = document.createElement("h1");
  title.textContent = data.title;

  const content = document.createElement("p");
  content.textContent = data.content;

  const created_at = document.createElement("p");
  created_at.textContent = data.created_at;

  const user = document.createElement("p");
  user.textContent = data.user;

  const updated_at = document.createElement("p");
  updated_at.textContent = data.updated_at;

  if (data.image == null) {
  } else {
    const image = document.createElement("img");
    image.src = base_url + data.image;
    article.appendChild(image);
  }

  const commentSection = document.createElement("div");

  const comments_list = data.comments;

  comments_list.forEach((comment) => {
    console.log(comment);
    console.log(comment.content);
    console.log(comment.user.email);

    const commentDiv = document.createElement("div");
    const content = document.createElement("p");
    content.textContent = comment.content;

    const user = document.createElement("p");
    user.textContent = comment.user.email;

    commentDiv.appendChild(content);
    commentDiv.appendChild(user);

    commentSection.appendChild(commentDiv);
  });

  article.appendChild(title);
  article.appendChild(content);
  article.appendChild(created_at);
  article.appendChild(updated_at);
  article.appendChild(user);
  article.appendChild(commentSection);
}

loadArticle();
