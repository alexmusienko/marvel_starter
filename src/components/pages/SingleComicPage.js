import { useParams } from "react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";

const SingleComicPage = () => {
    const {comicId} = useParams();

    return (
        <>
            <ErrorBoundary>
                <AppBanner />
            </ErrorBoundary>
            <ErrorBoundary>
                <SingleComic id={comicId} />
            </ErrorBoundary>
        </>
    );
}

export default SingleComicPage;