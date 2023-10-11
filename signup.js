const signupButton = document.querySelector("#signup-button");
signupButton.addEventListener("click", handleSignup);

async function handleSignup() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#password-confirm").value;

  // 비밀번호와 비밀번호 확인이 같은지 확인
  if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const data = { email: email, password: password };

  const res = await postSignup(data);

  if (res.status == 200) {
    alert("회원가입이 완료되었습니다.");
    window.location.href = "/";
  } else {
    alert("회원가입에 실패하였습니다.");
    const resData = await res.json();
    console.log(resData);
  }
}
