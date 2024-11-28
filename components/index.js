const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 게임 시작 함수
// 사용자에게 특정 값을 받아서 게임 시작 혹은 종료하는 기능
function gameStart() {
  //컴퓨터 랜덤 숫자 뽑기
  let compNum = [];
  let numFound = false;

  //사용자 입력값 받기 (게임 시작)
  rl.question(
    "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요: ",
    (command) => {
      if (command === "1") {
        // 1을 입력하면 새로운 게임 시작
        compNum = pickCompNum();

        while (!numFound) {
          rl.question(
            "컴퓨터가 숫자를 뽑았습니다.\n숫자를 입력해주세요: ",
            (userNum) => {
              const result = userNum.split("");
            }
          );
          gameStart();
        }
      } else if (command === "9") {
        // 9를 입력하면 애플리케이션 종료
        console.log("애플리케이션이 종료되었습니다.");
        numFound = true;
        rl.close();
      } else {
        console.log("잘못된 입력입니다. 1 또는 9를 입력하세요.");
        gameStart();
      }
    }
  );
}

/**컴퓨터가 생각하는 3자리 랜덤 숫자 생성 */
function pickCompNum() {
  // 무작위 생성될 숫자가 저장될 배열
  const numbers = [];

  // 3개의 숫자를 선정
  // numbers 배열 내부 요소가 3개가 될 때까지 반복
  while (numbers.length < 3) {
    // 무작위 정수 하나를 생성
    const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

    // 생성된 무작위 정수가 numbers 배열 내부의 값과 중복되는지 확인.
    // 값이 중복되지 않는다면, numbers 배열에 생성된 정수를 push
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  // 완성된 배열을 반환.
  return numbers;
}

// // 사용자와 컴퓨터 입력값 비교
// function compareNum() {}

// // 게임 종료
// function gameEnd() {}

gameStart();
