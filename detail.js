console.log("detail.js 실행중!");

const commentSubmitBtn = document.querySelector("#comment-submit");
commentSubmitBtn.addEventListener("click", handleCommentSubmit);

const editButton = document.querySelector("#edit-button");
editButton.addEventListener("click", handleEdit);

const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", handleDelete);

async function handleDelete() {
  const id = getId();
  console.log(`삭제할 아이디: ${id}`);
  const res = await deleteArticle(id);
  console.log(res.status);

  if (res.status == 204) {
    alert("삭제되었습니다.");
    window.location.href = "index.html";
  } else {
    alert("삭제중에 문제가 발생했습니다.");
  }
}

async function handleCommentDelete(id) {
  console.log(`${id} 댓글 삭제하기`);

  const response = await deleteComment(id);

  //결과에 따라 분기
  if (response.status == 204) {
    alert("댓글이 삭제되었습니다.");
    loadComments();
  } else {
    alert("댓글 삭제에 실패했습니다.");
  }
}

async function handleEdit() {
  const id = getId();
  console.log(`수정할 아이디: ${id}`);

  window.location.href = `/edit.html?id=${id}`;

  // await putArticle(id);
}

function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");

  return myParam;
}

async function loadComments() {
  const accessToken = localStorage.getItem("accessToken");
  const decoded = parseJwt(accessToken);
  const current_user_id = decoded.user_id;

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

    if (current_user_id == comment.user.id) {
      console.log("내 댓글");
      const deleteCommentButton = document.createElement("button");
      deleteCommentButton.addEventListener("click", function () {
        handleCommentDelete(comment.id);
      });
      deleteCommentButton.textContent = "댓글 삭제하기!";

      deleteCommentButton.id = comment.id;

      commentDiv.appendChild(deleteCommentButton);
    }

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

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

async function loadArticle() {
  const accessToken = localStorage.getItem("accessToken");
  const decoded = parseJwt(accessToken);
  const current_user_id = decoded.user_id;

  const id = getId();
  const response = await fetch(`http://127.0.0.1:8000/articles/${id}/`);

  const data = await response.json();

  let isMine = false;

  if (data.user != null) {
    if (data.user.id == current_user_id) {
      isMine = true;
    }
  }

  if (!isMine) {
    const buttons = document.querySelector("#buttons");
    buttons.remove();
  }

  const article = document.querySelector("#article");

  const title = document.createElement("h1");
  title.textContent = data.title;

  const content = document.createElement("p");
  content.textContent = data.content;

  const created_at = document.createElement("p");
  created_at.textContent = data.created_at;

  const user = document.createElement("p");
  if (data.user == null) {
    user.textContent = "탈퇴한 사용자";
  } else {
    user.textContent = data.user.email;
  }

  const updated_at = document.createElement("p");
  updated_at.textContent = data.updated_at;

  if (data.image == null) {
  } else {
    const image = document.createElement("img");
    image.src = base_url + data.image;
    article.appendChild(image);
  }

  loadComments();

  article.appendChild(title);
  article.appendChild(content);
  article.appendChild(created_at);
  article.appendChild(updated_at);
  article.appendChild(user);
}

loadArticle();
