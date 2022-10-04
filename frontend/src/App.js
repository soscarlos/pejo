import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import ToDos from './pages/ToDos';
import Locations from './pages/Locations';
import Documents from './pages/Documents';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import Reminder from './pages/Reminders';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todos" element={<ToDos />} />
          <Route path="locations" element={<Locations />} />
          <Route path="documents" element={<Documents />} />
          <Route path="tips" element={<Tips />} />
          <Route path="reminders" element={<Reminder />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;