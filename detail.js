console.log("detail.js 실행중!");

const commentSubmitBtn = document.querySelector("#comment-submit");
commentSubmitBtn.addEventListener("click", handleCommentSubmit);

function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");

  return myParam;
}

async function loadComments() {
  const id = getId();
  const comments_list = await getComments(id);

  const commentSection = document.querySelector("#comment-section");
  commentSection.innerHTML = "";

  comments_list.forEach((comment) => {
    console.log(comment);
    console.log(comment.content);
    console.log(comment.user.email);

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const content = document.createElement("p");
    content.textContent = comment.content;

    const user = document.createElement("p");
    user.textContent = comment.user.email;

    commentDiv.appendChild(content);
    commentDiv.appendChild(user);

    commentSection.appendChild(commentDiv);
  });
}

async function handleCommentSubmit() {
  const commentInputElement = document.querySelector("#comment-input");
  const commentInputValue = commentInputElement.value;
  const id = getId();

  const response = await postComment(id, commentInputValue);

  console.log(response);

  commentInputElement.value = "";

  //refresh
  location.reload();
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

  const comments_list = data.comments;

  const commentSection = document.querySelector("#comment-section");

  comments_list.forEach((comment) => {
    console.log(comment);
    console.log(comment.content);
    console.log(comment.user.email);

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

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
