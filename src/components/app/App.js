import { Route, Routes, useLocation } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleItemPage, Page404 } from "../pages";
import './app.css';
import { AnimatePresence } from "framer-motion";

const App = () => {
    const location = useLocation();

    return (
        <div className="app">
            <AppHeader />
            <main>
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:id" element={<SingleItemPage mode="comic"/>} />
                        <Route path="/chars/:id" element={<SingleItemPage mode="char"/>} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App;