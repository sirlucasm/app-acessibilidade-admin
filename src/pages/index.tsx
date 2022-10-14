import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/use-auth";

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const user = await signIn({ email, password });
      if (!user) {
        toast.error('Você não tem permissão');
        return;
      }
      router.replace('/app');
    } catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex justify-center flex-col items-center h-[100vh] bg-primary">
      <div className="flex flex-col bg-white justify-between w-[400px] h-[400px]">
        <div className="border-b-2 text-center py-6">
          <h3 className="">BEM VINDO DE VOLTA!</h3>
        </div>
        <form className="px-14 py-6" onSubmit={handleSubmit}>
          <div className="my-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              type="password"
              placeholder="************"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-button-primary w-[100%] py-3 mt-3 text-white uppercase text-xs">
              Entrar
            </button>
          </div>
        </form>
        <div className="px-7 border-t-2 py-4">
          <a
            className=""
            href="https://mangalivre.net/ler/tokyo-revengers/online/151471/4#/!page3"
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
