import {
    Route, BrowserRouter as Routes, Switch
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NewsReader from "../views/news/NewsReader";
import Home from "../views/home/Home";
import MyDocuments from "../views/documents/MyDocuments";
import AllDocuments from "../views/documents/AllDocuments";

export default function AppRoutes() {
    return (
        <Routes>
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/news" component={NewsReader}/>
                <PrivateRoute exact roles={['app-user']} path="/doc" component={AllDocuments}/>
                <PrivateRoute exact roles={['app-user']} path="/documents" component={MyDocuments}/>
                {/*<Route*/}
                {/*    path="*"*/}
                {/*    element={*/}
                {/*        <main style={{padding: "1rem"}}>*/}
                {/*            <p>There's nothing here!</p>*/}
                {/*        </main>*/}
                {/*    }*/}
                {/*/>*/}
          </Switch>
        </Routes>


    );
}
