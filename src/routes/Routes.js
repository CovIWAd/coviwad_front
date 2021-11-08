import {
    Route, Routes, BrowserRouter
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NewsReader from "../views/news/NewsReader";
import Home from "../views/home/Home";
import MyDocuments from "../views/documents/MyDocuments";

export default function AppRoutes() {
    return (
        <Routes>
                <Route path="/" element={<Home/>} exact/>
                <Route
                    path="/news"
                    element={
                        <PrivateRoute>
                            <NewsReader/>
                        </PrivateRoute>
                    } exact/>
                <PrivateRoute
                    path="/documents"
                    element={
                        <PrivateRoute>
                            <MyDocuments/>
                        </PrivateRoute>
                    } exact/>


                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>

    );
}
