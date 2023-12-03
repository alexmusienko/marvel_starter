import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";
import SingleChar from "../singleChar/SingleChar";
import motionParams from "../../services/motionParams";
import { Helmet } from "react-helmet";

const SingleItemPage = ({mode}) => {
    const { id } = useParams();

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
                    {mode === 'comic' ? <SingleComic id={id} /> : <SingleChar id={id} />}
                </ErrorBoundary>
            </motion.div>
        </>
    );
}

export default SingleItemPage;