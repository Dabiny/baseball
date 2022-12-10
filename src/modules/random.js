export const getRandomNumber = () => {
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // numberArray를 무작위로 4개 뽑아서 리턴하기 
    // numberArray를 무작위를 섞어야 해서 랜덤소트를 해줘야한다. 따로함수 만들기
    const randomNumber = shuffle(numberArray);
    return randomNumber.splice(0, 4); //4자리만 뽑아서 리턴
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5)
}