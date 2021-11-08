import {Route, Routes} from "react-router-dom";
import NewsReader from "../views/news/NewsReader";
import Home from "../views/home/Home";
import MyDocuments from "../views/documents/MyDocuments";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact/>
      <Route path="/news" element={<NewsReader />} exact/>
      <Route path="/documents" element={<MyDocuments />} exact />
    </Routes>
  );
}
