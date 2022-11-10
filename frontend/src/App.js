import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import ToDos from './pages/ToDos';
import Locations from './pages/Locations';
import Documents from './pages/Documents';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import Reminder from './pages/Reminders';
import PetProfile from './pages/PetProfiles';
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';
import useFetchToken from "./hooks/useFetchToken";
import { AuthorizationProvider } from "./components/contexts/AuthorizationContext";
import useAuthorization from "./hooks/useAuthorization";

const App = () => {
  const { authorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');

  const pets = useFetchToken('http://localhost:8080/pets', storedToken? storedToken : authorization.accessToken).data;

  return (
    <div className="App">
      <BrowserRouter>
      <AuthorizationProvider>
        <Routes>
          <Route path="/" element={<Layout pets={pets} />}>
            <Route index element={<Home />} />
            <Route path="todos" element={<ToDos />} />
            <Route path="locations" element={<Locations />} />
            <Route path="documents" element={<Documents />} />
            <Route path="tips" element={<Tips />} />
            <Route path="reminders" element={<Reminder />} />
            {pets != null ? pets.map(pet =>          
            <Route path={"pets/" + pet.id} element={<PetProfile petId={pet.id}/>} />         
            )
            : "No Pets"}        
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthorizationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
