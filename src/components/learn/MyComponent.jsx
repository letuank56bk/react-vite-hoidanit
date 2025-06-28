import './style.css';

const MyComponent = () => {
    const hoidanit = "Alan check 1";
    return (
        <>
            <div>{hoidanit} - CTTV</div>
            <div>{console.log("Check function in HTML")}</div>
            <div className="child"
                style={{ color: 'blue', fontSize: '20px' }}
            > Child </div>
        </>
    );
}

export default MyComponent;