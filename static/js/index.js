const 정답 = "APPLE";

let index = 0; // 수정이 가능한 변수 생성, 입력 후 다음 칸으로 넘어가게 하기 위한 변수
let attempts = 0; // 시도 가능 횟수 체크 할 변수 생성
let timer

function appStart() {
    //게임 종료시 메시지를 띄워주는 함수
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; width:200px; height:100px; background-color:pink;";
        document.body.appendChild(div); //위에 만든 div 코드를 body 코드에 넣어줌
    }

    //다음 줄(다음 시도) 이동하는 함수
    const nextLine = () => {
        if (attempts === 6) return gameover(); //여섯번째 시도이면 그냥 리턴 시킴
        attempts += 1;
        index = 0;
    };

    //게임 종료 함수
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown); //키보드 입력이 안되도록 이벤트를 없앰
        window.removeEventListener("click", clickKeydown);
        displayGameover();
        //게임 종료시 타이머도 멈춤
        clearInterval(timer);
    }

    const handleEnterKey = () => {
        let 맞은_갯수 = 0;

        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자) { //포함되는 글자이면서 위치도 같다면
                맞은_갯수 += 1;
                block.style.background = "#6AAA64"
            }
            else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";//정답은 아니나 포함되는 글자라면
            else block.style.background = "#787C7E"; //포함되지 않는다면
            block.style.color = "white";
        }

        if (맞은_갯수 === 5) {
            gameover();
        } else nextLine();
    };

    //백스페이스가 눌렸을 때 이벤트 함수
    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);  //입력 후 다음 인덱스로 넘어가 있으므로 현재 인덱스가 아닌 이전 인덱스 값을 지워주기 위해 현재 인덱스 값에서 -1을 해준다.
            preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;    //인덱스가 0이 아닐때만
    }

    //키가 입력 됐을 때 이벤트
    const handleKeydown = (event) => {

        const key = event.key.toUpperCase(); // 대문자로 입력되게 함
        const keyCode = event.keyCode
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`); // n번째 시도(attempts)에 m번째 인덱스(index)에 텍스트를 업데이트 함.

        if (event.key === "Backspace") handleBackspace();  //백스페이스가 선택되면
        else if (index === 5) {
            if (event.key === 'Enter') handleEnterKey();
            else return; //엔터키가 아닌 다른 키가 눌리면 끝냄
        }
        else if (event.key === 'Enter') handleEnterKey(); // 엔터키가 눌리면
        else if (65 <= keyCode && keyCode <= 90) {    // 65~90번 사이의 키가 입력이 되면(a = 65 ~ z = 90)
            thisBlock.innerText = key;
            index += 1; //한 번 입력하고 나서 인덱스 값을 1씩 늘림
        }

    }

    //마우스로 클릭해서 입력하기
    const clickKeydown = (event) => {

        const keys = event.target.getAttribute("data-key");
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

        if (keys === "Backspace") handleBackspace();  //백스페이스가 선택되면
        else if (index === 5) {
            if (keys === 'Enter') handleEnterKey();
            else return; //엔터키가 아닌 다른 키가 눌리면 끝냄
        }
        else if (keys === 'Enter') handleEnterKey(); // 엔터키가 눌리면
        else if (keys !== null && keys.length === 1) {
            thisBlock.innerText = keys;
            index += 1; //한 번 입력하고 나서 인덱스 값을 1씩 늘림
        }

    }

    //게임 진행 타이머
    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `Time : ${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("click", clickKeydown);
}

appStart();