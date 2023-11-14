import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import SingleComic from "../singleComic/SingleComic";

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader />

            {/* <main>
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
            </main> */}

            {/* <main>
                <ErrorBoundary>
                    <AppBanner />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ComicsList />
                </ErrorBoundary>
            </main> */}

            <main>
                <ErrorBoundary>
                    <AppBanner />
                </ErrorBoundary>
                <ErrorBoundary>
                    <SingleComic id={57} />
                </ErrorBoundary>
            </main>

        </div>
    )
}

export default App;