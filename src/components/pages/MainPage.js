import { useState } from "react";
import { motion } from "framer-motion";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import motionParams from "../../services/motionParams";
import { Helmet } from "react-helmet";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Main page"
                />
                <title>Marvel information portal - Heroes</title>
            </Helmet>
            <motion.div {...motionParams}>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </motion.div>
        </>
    );
}

export default MainPage;