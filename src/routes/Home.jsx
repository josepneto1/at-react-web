import { Component } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { axios } from "../axios";
import { LinkButton } from "../components/LinkButton";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-simple-toasts";

const tarefasIniciais = [
  {
    id: 0,
    title: "",
    description: "",
    step: "",
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefas: tarefasIniciais,
    };
  }

  componentDidMount() {
    this.fetchTarefas();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tarefas !== this.state.tarefas) {
      this.fetchTarefas();
    }
  }

  fetchTarefas = async () => {
    try {
      const response = await axios.get("/tasks");
      const tarefas = response.data;
      this.setState({ tarefas });
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  moverTarefa = async (task, novoStep) => {
    try {
      await axios.patch(`/tasks/${task.id}/update-step`, { step: novoStep });
      toast(`Tarefa #${task.id} movida para "${novoStep}"`);
      this.fetchTarefas();
    } catch (error) {
      console.error("Erro ao mover tarefa:", error);
    }
  };

  deletarTarefa = async (taskId) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      const deletedTask = response.data;
      toast(`Tarefa #${deletedTask.id} deletada com sucesso`);
      this.fetchTarefas();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  render() {
    const { tarefas } = this.state;

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
                    <Button className="bg-gray-200 hover:bg-gray-100 text-slate-600">
                      <FaArrowLeftLong />
                    </Button>
                    <Button
                      className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                      onClick={() => this.moverTarefa(task, "Em andamento")}
                    >
                      <FaArrowRightLong />
                    </Button>
                    <LinkButton
                      to={`/editar-tarefa/${task.id}`}
                      className="bg-blue-600 hover:bg-blue-500 text-slate-100 h-8"
                    >
                      Editar
                    </LinkButton>
                    <LinkButton
                      onClick={() => this.deletarTarefa(task.id)}
                      className="bg-red-600 hover:bg-red-500 text-slate-100"
                    >
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
                      onClick={() => this.moverTarefa(task, "Para fazer")}
                      className="bg-gray-200 hover:bg-gray-100 text-slate-600"
                    >
                      <FaArrowLeftLong />
                    </Button>
                    <Button
                      onClick={() => this.moverTarefa(task, "Pronto")}
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
                    <LinkButton
                      onClick={() => this.deletarTarefa(task.id)}
                      className="bg-red-600 hover:bg-red-500 text-slate-100"
                    >
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
                      onClick={() => this.moverTarefa(task, "Em andamento")}
                    >
                      <FaArrowLeftLong />
                    </Button>
                    <Button className="bg-gray-200 hover:bg-gray-100 text-slate-600">
                      <FaArrowRightLong />
                    </Button>
                    <LinkButton
                      to={`/editar-tarefa/${task.id}`}
                      className="bg-blue-600 hover:bg-blue-500 text-slate-100 h-8"
                    >
                      Editar
                    </LinkButton>
                    <LinkButton
                      onClick={() => this.deletarTarefa(task.id)}
                      className="bg-red-600 hover:bg-red-500 text-slate-100"
                    >
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
}

export default Home;
