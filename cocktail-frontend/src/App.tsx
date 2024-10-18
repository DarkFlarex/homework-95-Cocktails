import AppToolbar from "./UI/AppToolbar/AppToolbar";
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/login";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import NewCocktail from "./features/Cocktails/NewCocktail";
import Cocktails from "./features/Cocktails/Cocktails";
import OneCocktail from "./features/Cocktails/OneCocktail";
import MyCocktails from "./features/MyCocktails/MyCocktails";
import OneMyCocktail from "./features/MyCocktails/OneMyCocktail";

function App() {
    const user = useAppSelector(selectUser);
  return (
      <>
          <header>
              <AppToolbar/>
          </header>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<Cocktails />} />
                  <Route path="/cocktails/:id" element={<OneCocktail />} />
                  <Route
                      path="/my_cocktails/:id"
                      element={
                          <ProtectedRoute isAllowed={!!user}>
                              <OneMyCocktail/>
                          </ProtectedRoute>
                       }
                  />
                  <Route
                      path="/my_cocktails"
                      element={
                          <ProtectedRoute isAllowed={!!user}>
                              <MyCocktails />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/cocktails/new"
                      element={
                          <ProtectedRoute isAllowed={!!user}>
                              <NewCocktail />
                          </ProtectedRoute>
                      }
                  />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
              </Routes>
          </Container>
      </>
  )
}

export default App