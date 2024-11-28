const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 사용자에게 특정 값을 받아서 게임 시작 혹은 종료하는 기능
function gameStart() {
  // 컴퓨터 랜덤 숫자 뽑기
  let compNum = [];
  let numFound = false;

  rl.question(
    "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요: ",
    (command) => {
      if (command === "1") {
        compNum = pickCompNum();
        console.log(`컴퓨터 생성값 : ${compNum}`);
        console.log("컴퓨터가 숫자를 뽑았습니다.");

        const gameLoop = () => {
          rl.question("숫자를 입력해주세요: ", (userNum) => {
            const result = userNum.split("").map(Number);
            console.log(`사용자 입력값: ${result}`);

            if (result.length !== 3 || result.some((number) => isNaN(number))) {
              console.log(
                "잘못된 입력입니다. 1부터 9 사이의 숫자 3가지를 입력해주세요."
              );
              gameLoop();
              return;
            }

            const { strikes, balls } = compareNum(compNum, result);

            if (strikes && balls) {
              console.log(`${strikes} 스트라이크 ${balls} 볼`);
            } else if (strikes) {
              console.log(`${strikes} 스트라이크`);
            } else if (balls) {
              console.log(`${balls}볼`);
            } else {
              console.log("낫싱!");
            }

            if (strikes === 3) {
              console.log("3개의 숫자를 모두 맞히셨습니다.");
              console.log("게임종료!");
              gameStart();
            }

            gameLoop();
          });
        };

        gameLoop();
      } else if (command === "9") {
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
  const numbers = [];

  while (numbers.length < 3) {
    const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
}

function compareNum(compNum, userNum) {
  let strikes = 0;
  let balls = 0;

  // 사용자 입력값 배열을 순회하면서, 컴퓨터 생성값 배열과 비교해준다
  // num은 배열 내부의 요소 하나를 가져오는 인자, idx는 해당 요소의 index값
  userNum.forEach((num, idx) => {
    if (num === compNum[idx]) {
      strikes++;
    } else if (compNum.includes(num)) {
      balls++;
    }
  });

  return { strikes, balls };
}

gameStart();
