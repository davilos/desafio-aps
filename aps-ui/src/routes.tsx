import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Create from "./pages/CreateCliente";
import List from "./pages/ListCliente";
import Update from "./pages/UpdateCliente";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Create />} />
        <Route path="/clientes" element={<List />} />
        <Route path="/clientes/:clienteId" element={<Update />} />
      </Switch>
    </Router>
  );
};
