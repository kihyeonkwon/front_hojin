const button = document.querySelector("#edit-submit-button");
button.addEventListener("click", handleEditSubmit);

async function handleEditSubmit() {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const image = document.querySelector("#image").files[0];

  const id = getId();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const res = await putArticle(id, formData);

  //response 코드에 따라서 분기
  if (res.status == 200) {
    alert("수정되었습니다.");
    window.location.href = `/detail.html?id=${id}`;
  } else {
    alert("수정중에 문제가 발생했습니다.");
  }
}

function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");

  return myParam;
}

async function loadArticle() {
  const id = getId();
  const response = await fetch(`http://127.0.0.1:8000/articles/${id}/`);

  const data = await response.json();

  console.log(data);

  const title = document.querySelector("#title");
  title.value = data.title;

  const content = document.querySelector("#content");
  content.value = data.content;
}

loadArticle();
