import Link from "next/link";
import { Container } from "../components/containers";
import { Loading } from "../components/loading";
import { useAuthContext } from "../contexts/auth.context";
import { MdPlace, MdPerson } from 'react-icons/md';
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";

const Application = () => {
  const { currentUser } = useAuthContext()

  if (!currentUser) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="flex items-center justify-between sm:w-[400px]">
        <h2 className="text-3xl">Olá, <strong>{currentUser.name}</strong></h2>
        <button
          onClick={() => signOut(auth)}
          className="border-0 text-blue-600 hover:text-blue-800 hover:underline text-lg"
        >
          sair
        </button>
      </div>
      <div className="flex items-center mt-7">
        <div className="bg-white hover:bg-gray-300 w-[190px] h-[95px] rounded duration-100 m-2">
          <Link href="/locais">
            <a className="h-[100%] flex flex-col items-center justify-center">
              <MdPlace size={32} />
              <span className="text-lg">Locais</span>
            </a>
          </Link>
        </div>
        <div className="bg-white hover:bg-gray-300 w-[190px] h-[95px] rounded duration-100 m-2">
          <Link href="/usuarios">
            <a className="h-[100%] flex flex-col items-center justify-center">
              <MdPerson size={32} />
              <span className="text-lg">Usuários</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Application;
