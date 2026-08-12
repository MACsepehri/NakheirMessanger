import { Link } from "react-router-dom"
import '../css/NotFound.css'

let NotFoundPage = () => {
    return (
        <div className="container">
            <div className="box_notfound">
                <img src="src/assets/orange-error-icon-0.png" alt="" />
                <h1>صفحه مورد نظر شما پیدا نشد</h1>
                <Link to='/'>رفتن به صفحه اصلی</Link>
            </div>
        </div>
    )
};

export default NotFoundPage;