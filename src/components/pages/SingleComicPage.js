import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";
import motionParams from "../../services/motionParams";
import { Helmet } from "react-helmet";

const SingleComicPage = () => {
    const { comicId } = useParams();

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Comic info"
                />
                <title>Marvel information portal - Comic info</title>
            </Helmet>
            <motion.div {...motionParams}>
                <ErrorBoundary>
                    <AppBanner />
                </ErrorBoundary>
                <ErrorBoundary>
                    <SingleComic id={comicId} />
                </ErrorBoundary>
            </motion.div>
        </>
    );
}

export default SingleComicPage;