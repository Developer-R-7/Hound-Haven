import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PetDash from "./Pages/PetDash";
import NavBar from "./Components/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import PetContext from "./Context/PetContext";
import UserContext from "./Context/UserContext";
import Confirmed from "./Pages/Confirmed";
import Confirm from "./Pages/Confirm";



function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  const [newPetData, setNewPetData] = useState("pet babies");
  const [petId, setPetId] = useState("");
  const [appt, setAppt] = useState(0);
  const [pets, setPets] = useState({});

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
    } else {
      try {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        });

        setUserData({ token, user: userRes.data });
      } catch (err) {
        console.log("User must login");
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <ToastContainer />

        <UserContext.Provider value={{ userData, setUserData }}>
          <PetContext.Provider
            value={{
              newPetData,
              setNewPetData,
              petId,
              setPetId,
              appt,
              setAppt,
              pets,
              setPets,
            }}
          >
            <NavBar />
            <Switch>
              <Route exact path="/petDash" component={PetDash} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/confirm_token/:token" component={Confirmed} />

              <Route path="/" component={Home} />
              
            </Switch>

            <Footer />
          </PetContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
