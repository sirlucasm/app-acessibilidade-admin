import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../configs/firebase";

const Home = () => {
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      toast.promise(sendPasswordResetEmail(auth, email), {
        success: 'Email de recuperação enviado',
        error: 'Erro ao enviar email'
      })
        .then(() => router.push('/'));
    } catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex justify-center flex-col items-center h-[100vh] bg-primary">
      <div className="flex flex-col bg-white w-[400px] h-[350px]">
        <div className="border-b-2 text-center py-6">
          <h3 className="">ESQUECI A SENHA</h3>
        </div>
        <div className="self-center">
          <Image
            src="/logo_acessibilidade_ruas.png"
            alt="User Image"
            width={90}
            height={90}
            className="rounded-lg"
          />
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
          <div>
            <button className="bg-button-primary w-[100%] py-3 mt-3 text-white uppercase text-xs">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
