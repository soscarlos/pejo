import { Outlet, Routes, Route } from "react-router-dom"
import PetProfile from "../PetProfiles"

const Pets = () => {
  return (
    <>
        <Routes>
            <Route path=":petId" element={<PetProfile petId={":petId"}/>} />
        </Routes>
        
        <Outlet />
    </>
  )
}

export default Pets