import { motion } from "framer-motion";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import motionParams from "../../services/motionParams";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Comics list"
                />
                <title>Marvel information portal - Comics</title>
            </Helmet>
            <motion.div {...motionParams}>
                <ErrorBoundary>
                    <AppBanner />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ComicsList />
                </ErrorBoundary>
            </motion.div>
        </>
    );
}

export default ComicsPage;