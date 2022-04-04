const Form = ({ updateMainCat }) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMsg('');

        if (includesHangul(userValue)) {
            setErrorMsg('한글은 입력할 수 없습니다.');
        }

        setValue(userValue.toUpperCase())
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMsg('');
        if (value == '') {
            setErrorMsg('빈 값은 입력할 수 없습니다.');
            return;
        } else if (value == '사랑해') {
            alert("나도 밍밍💖");
            return;
        }
        updateMainCat(value);
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text"
                name="name"
                placeholder="영어 대사를 입력해주세요"
                onChange={handleInputChange}
                value={value} />
            <button type="submit">생성</button>
            <p style={{ color: "red" }}>{errorMsg}</p>
        </form >
    )
}
export default Form;