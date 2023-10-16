console.log("test.js 실행중!");

my_list = [
  { title: "제목1", content: "내용1" },
  { title: "제목2", content: "내용2" },
];

my_list.forEach((comment) => {
  console.log("foreach의 제일 위");
  console.log(comment.content);
  console.log("foreach의 제일 아래");
});
