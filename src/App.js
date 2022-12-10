import { useEffect, useState } from 'react';
import './assets/style/App.scss';
import baseball from './assets/image/baseball.png';
import InputNumber from './components/InputNumber';
import Logs from './components/Logs';
import { getRandomNumber } from './modules/random';

function App() {
  const [randomNumber, setRandomNumber] = useState(getRandomNumber()); // randomNumber는 Array형태
  const [isSuccess, setIsSuccess] = useState(false); // all Strike인지 아닌지
  const [inputvalue, setInputvalue] = useState(''); // 인풋값 상태
  const [logs, setLogs] = useState([]); // 볼 기록을 작성하는 li에 갖다붙일 배열

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  const handleOnChange = (event) => {
    console.log(event.target.value);
    setInputvalue(event.target.value);
  };

  const handleOnClick = () => {
    //버튼이 눌리면 인풋값을 가져와서 숫자 4자리가 맞는지 분기처리해준다.
    // 만약 모두 분기처리가 끝나면 랜덤숫자와 비교해보고
    // 만약 1 2 3 4 -> 3 1 2 2 이면 1 2 3은 자릿수는 틀리지만 포함되어있는 숫자이므로 ball을 +3한다.
    // 만약 같은자리 같은숫자이면 strike ++ 해줘야한다.

    const inputNumber = inputvalue.split('').map((v) => +v); // input값 숫자 array로 바꿔주기

    // 만약 숫자가 아닌 다른 문자열값이 들어갔을때
    // some() : 지정된 콜백함수가 배열의 모든 요소에 대해 true를 반환하는지 여부를 결정한다. 만약 isNAN이 하나라도 있다면 false반환.
    if (inputNumber.some((number) => isNaN(number))) {
      alert('숫자만 입력해 주세요 !');
      setInputvalue('');
      return;
    }
    // 만약 숫자의 값이 4자리 이상일 때
    if (inputNumber.length > 4) {
      alert('4자리의 숫자를 입력해주세요 !');
      setInputvalue('');
      return;
    }
    // 만약 아무것도 안써져있을 때
    if (inputNumber.length === 0) {
      alert('4자리의 숫자를 입력해주세요 !');
      setInputvalue('');
      return;
    }
    // 만약 중복숫자가 들어가있을 때
    if (
      inputNumber.some((v) => {
        return inputNumber.indexOf(v) !== inputNumber.lastIndexOf(v);
      })
    ) {
      alert(
        '중복된 숫자가 들어있어요. 중복된 숫자 없이 4자리의 숫자를 입력해주세요!',
      );
      setInputvalue('');
      return;
    }

    const { strike, ball } = inputNumber.reduce(
      (prev, curr, idx) => {
        // 랜덤넘버[idx]값과 inputNumber 현재값(curr)이 같으면 strike++;
        if (randomNumber[idx] === curr) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        // 랜덤넘버[idx]값은 현재값과 다른데, 랜덤넘버안에 curr가 존재하면 ball++;
        if (randomNumber[idx] !== curr && randomNumber.includes(curr)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }
        return prev; // 꼭 prev값을 리턴해줘야 한다. 그래야 다음 curr에서도 prev가 넘어감.
      },
      {
        strike: 0,
        ball: 0,
      },
    );

    if (strike === 4) {
      // strike가 4개이면 모두 맞춘 것이다.
      alert('🎊정답입니다!!!🎊');
      setIsSuccess(true);
      setInputvalue('');
      return;
    } else {
      setLogs([...logs, `strike 횟수: ${strike} , ball 횟수: ${ball} `]);
    }
  };

  const initialize = () => {
    setRandomNumber(getRandomNumber);
    setInputvalue('');
    setLogs([]);
    setIsSuccess(false);
  };

  return (
    <div className="header">
      <div className="title-desciption">
        <h1>⚾️ Baseball game ⚾️</h1>
        <h3>
          4자리의 숫자를 입력 후 모두 strike가 되도록 맞춰보세요 !
          <p className="game-description">
            🏆 Strike: 4자리 숫자 중 위치도 정확하게 맞춘 횟수
            <br />
            🏆 Ball: 4자리 숫자중 위치는 맞지 않지만 숫자가 포함된 횟수
          </p>
          <p>중복되지 않은 1 ~ 9 사이의 수입니다.</p>
        </h3>
      </div>
      <div className="container">
        <div className="randomNumber-container">
          {isSuccess ? randomNumber : '❓ ❓ ❓ ❓'}
        </div>
      </div>
      <InputNumber
        inputvalue={inputvalue}
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        handleInitialize={initialize}
        isSuccess={isSuccess}
      />
      <Logs logs={logs} />
    </div>
  );
}

export default App;
