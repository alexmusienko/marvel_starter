import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <ErrorBoundary>
                <AppBanner />
            </ErrorBoundary>
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    );
}

export default ComicsPage;