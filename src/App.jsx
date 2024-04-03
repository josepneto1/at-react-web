import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { history } from "./history";
import { Home } from "./routes/Home";
import { CriarTarefa } from "./routes/CriarTarefa";
import { EditarTarefa } from "./routes/EditarTarefa";
import { Layout } from "./layout/Layout";
import { configure } from "axios-hooks";
import { axios } from "./axios"

configure({ axios })

export default function App() {
  return (
    <HistoryRouter history={history}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-tarefa" element={<CriarTarefa />} />
          <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
        </Routes>
      </Layout>
    </HistoryRouter>
  );
}
