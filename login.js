const loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", handleLogin);

async function handleLogin() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = { email: email, password: password };

  const res = await postLogin(data);

  const resData = await res.json();

  if (res.status == 200) {
    const accessToken = resData["access"];
    localStorage.setItem("accessToken", accessToken);
    alert("로그인이 완료되었습니다.");
    window.location.href = "/";
  } else {
    alert("로그인에 실패하였습니다.");
    console.log(resData);
  }
}
