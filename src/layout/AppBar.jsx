import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";
import { LinkButton } from "../components/LinkButton";

export function AppBar() {
  return(
    <header className="flex border-b p-4 items-center justify-between">
      <div>
        <Link to="/" className="flex items-center gap-2 hover:text-slate-500">
          <LuListTodo size="36px"/>
          <span className="text-xl font-bold">Minhas Tarefas</span>
        </Link>
      </div>
      <div>
        <LinkButton className="bg-blue-600 hover:bg-blue-800 text-slate-100 py-5 px-4 font-bold text-base" to="/criar-tarefa">Criar Tarefa</LinkButton>
      </div>
    </header>
  );
}
