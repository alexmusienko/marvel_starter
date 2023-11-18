import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, ComicPage } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage />
                        </Route>
                        <Route exect path="comic">
                            <ComicPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;