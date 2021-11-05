import {Route, Routes} from "react-router-dom";
import NewsReader from "../views/news/NewsReader";
import Home from "../views/Home";
import AddDocument from "../views/documents/AddDocument";

export default function AppRoutes() {
  return (
    <Routes>
      {/*<Route path="/" exact component={Home} />
      <Route path="/news" exact component={NewsReader} />*/}
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewsReader />} />
      <Route path="/documents" element={<AddDocument />} />
    </Routes>
  );
}
