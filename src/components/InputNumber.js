import '../assets/style/input.scss';
const InputNumber = ({
  inputvalue, // 인풋창 밸류값 변경 state
  handleOnChange, // 인풋창이 바뀔때마다 setState해주는 함수.
  isSuccess,
  handleOnClick,
  handleInitialize
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
