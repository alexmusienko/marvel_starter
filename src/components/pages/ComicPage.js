import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";

const ComicPage = () => {
    return (
        <>
            <ErrorBoundary>
                <AppBanner />
            </ErrorBoundary>
            <ErrorBoundary>
                <SingleComic id={57} />
            </ErrorBoundary>
        </>
    );
}

export default ComicPage;