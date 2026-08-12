import { Link } from "react-router-dom"

let NotFoundPage = () => {
    return (
        <div className="container">
            <div className="box_notfound">
                <h1>صفحه مورد نظر شما پیدا نشد</h1>
                <Link to='/'>رفتن به صفحه اصلی</Link>
            </div>
        </div>
    )
};

export default NotFoundPage;