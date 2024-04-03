import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { axios } from "../axios";
import useAxios from "axios-hooks";
import { LinkButton } from "../components/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from 'react-simple-toasts';

const tarefasIniciais = [
  {
    id: 0,
    title: "",
    description: "",
    step: "",
  },
];

export function Home() {
  const [{ data: tarefas = tarefasIniciais }, fetchTarefas] = useAxios(
    "/tasks",
    {
      manual: true,
    },
  );

  useEffect(() => {
    fetchTarefas();
  }, [tarefas.step]);

  const moverTarefa = async (task, novoStep) => {
    await axios.patch(`/tasks/${task.id}/update-step`, { step: novoStep });
    toast(`Tarefa #${task.id} movida para "${novoStep}"`);
    fetchTarefas();
  };

  const todo = tarefas.filter((task) => task.step === "Para fazer");
  const doing = tarefas.filter((task) => task.step === "Em andamento");
  const done = tarefas.filter((task) => task.step === "Pronto");

  return (
    <div className="flex justify-around w-4/5">
      <div className="border-r-2 border-blue-700 w-1/3 pl-1 px-5">
        <h2 className="pl-1 font-bold text-lg mb-4">Para fazer</h2>
        <ul className="flex flex-col gap-2">
          {todo.map((task) => (
            <li key={task.id}>
              <Card className="w-full min-w-64">
                <div>
                  <span>#{task.id}</span>
                  <p className="font-bold">{task.title}</p>
                  <p>{task.description}</p>
                </div>
                <div className="w-full flex gap-1">
                  <Button 
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                  >
                    <FaArrowLeftLong />
                  </Button>
                  <Button 
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                    onClick={() => moverTarefa(task, "Em andamento")}  
                    >
                    <FaArrowRightLong />
                  </Button>
                  <LinkButton
                    to={`/editar-tarefa/${task.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-slate-100 h-8"
                  >
                    Editar
                  </LinkButton>
                  <LinkButton className="bg-red-600 hover:bg-red-500 text-slate-100">
                    Deletar
                  </LinkButton>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-r-2 border-blue-700 w-1/3 px-5">
        <h2 className="pl-1 font-bold text-lg mb-4">Em Andamento</h2>
        <ul className="flex flex-col gap-2">
          {doing.map((task) => (
            <li key={task.id}>
              <Card className="w-full min-w-64">
                <div>
                  <span>#{task.id}</span>
                  <p className="font-bold">{task.title}</p>
                  <p>{task.description}</p>
                </div>
                <div className="w-full flex gap-1">
                  <Button 
                    onClick={() => moverTarefa(task, "Para fazer")}
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                  >
                    <FaArrowLeftLong />
                  </Button>
                  <Button 
                    onClick={() => moverTarefa(task, "Pronto")}
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                    >
                    <FaArrowRightLong />
                  </Button>
                  <LinkButton
                    to={`/editar-tarefa/${task.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-slate-100 h-8"
                  >
                    Editar
                  </LinkButton>
                  <LinkButton className="bg-red-600 hover:bg-red-500 text-slate-100">
                    Deletar
                  </LinkButton>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 px-5">
        <h2 className="pl-1 font-bold text-lg mb-4">Pronto</h2>
        <ul className="flex flex-col gap-2">
          {done.map((task) => (
            <li key={task.id}>
              <Card className="w-full min-w-64">
                <div>
                  <span>#{task.id}</span>
                  <p className="font-bold">{task.title}</p>
                  <p>{task.description}</p>
                </div>
                <div className="w-full flex gap-1">
                  <Button 
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                    onClick={() => moverTarefa(task, "Em andamento")}  
                  >
                    <FaArrowLeftLong />
                  </Button>
                  <Button 
                    className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                    >
                    <FaArrowRightLong />
                  </Button>
                  <LinkButton
                    to={`/editar-tarefa/${task.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-slate-100 h-8"
                  >
                    Editar
                  </LinkButton>
                  <LinkButton className="bg-red-600 hover:bg-red-500 text-slate-100">
                    Deletar
                  </LinkButton>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// const [tarefas, setTarefas] = useState([]);

// async function carregarTarefas() {
//   const response = await axios.get("/tasks");
//   const tarefas = response.data;
//   setTarefas(tarefas);
// }

// useEffect(() => {
//   carregarTarefas();
// }, []);
