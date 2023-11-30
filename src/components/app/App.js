import { Route, Routes, useLocation } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import './app.css';
import { AnimatePresence } from "framer-motion";

const App = () => {
    const location = useLocation();

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <SwitchTransition>
                    <CSSTransition key={location.key} timeout={500} classNames='page'> */}
                <AnimatePresence mode='wait' initial={false}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </AnimatePresence>
                {/* </CSSTransition>
                </SwitchTransition> */}
            </main>
        </div>
    )
}

export default App;