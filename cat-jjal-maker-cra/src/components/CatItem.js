//component는 무조건 대문자로 시작해야함
function CatItem(props) {
    return (

        <img src={props.img} style={{ width: "150px" }} />
    );
};
export default CatItem;
