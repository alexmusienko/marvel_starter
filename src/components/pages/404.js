import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <Link
                style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }}
                to="/">Back to main page</Link>
            <button
                style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'margin': '30px auto 0', 'padding': '20px' }}
                onClick={() => navigate(-1)}>Go back for 1 step in history</button>
        </div>
    );
}

export default Page404;