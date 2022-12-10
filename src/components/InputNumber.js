import '../assets/style/input.scss';
const InputNumber = ({
  inputvalue, // 인풋창 밸류값 변경 state
  handleOnChange, // 인풋창이 바뀔때마다 setState해주는 함수.
  isSuccess, // 버튼의 조건렌더링을 위해 필요한 state
  handleOnClick, // swing버튼을 눌렀을때 바로 조건검사를 실행해주는 이벤트함수
  handleInitialize // 다시하기 버튼을 눌렀을때 초기화해주는 이벤트함수
}) => {
  return (
    <div className='input-section'>
      <input
        type="text"
        value={inputvalue}
        onChange={handleOnChange}
      />
      {!isSuccess ? (
        <button onClick={handleOnClick}>Swing!</button>
      ) : (
        <button onClick={handleInitialize}>다시 하기</button>
      )}
    </div>
  );
};
export default InputNumber;
