import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import ToDos from './pages/ToDos';
import Locations from './pages/Locations';
import Documents from './pages/Documents';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import Reminder from './pages/Reminders';
import Pets from "./pages/Pets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';
import { AuthorizationProvider } from "./components/contexts/AuthorizationContext";
import RequireAuthorization from "./components/authorization/RequireAuthorization";
import { AddPetContextProvider } from "./components/contexts/AddPetContext";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <AuthorizationProvider>
        <AddPetContextProvider>
        <Routes>
          <Route element={<RequireAuthorization />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="to-dos" element={<ToDos />} />
              <Route path="locations" element={<Locations />} />
              <Route path="documents" element={<Documents />} />
              <Route path="tips" element={<Tips />} />
              <Route path="reminders" element={<Reminder />} />
              <Route path="pets/*" element={<Pets/>} />
            </Route>               
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />  
        </Routes>
        </AddPetContextProvider>
      </AuthorizationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
