import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { Container } from "../../components/containers";
import { Loading } from "../../components/loading";
import { useUser } from "../../hooks/use-user";
import { useDeficiency } from "../../hooks/use-deficiency";

const Locations = () => {
  const { users } = useUser();
  const { usersWithDeficiency, usersWithoutDeficiency } = useDeficiency();

  if (!users) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-2xl font-bold">Usuários</h2>
      </div>
      <div className="mt-5">
        <Link href="/usuarios/novo">
          <a className="flex items-center justify-center bg-button-primary w-[135px] py-2 text-white text-sm">
            <AiOutlinePlus className="mr-2" color="#fff" size={21} />
            Novo usuário
          </a>
        </Link>
      </div>
      <div className="flex items-center mt-10">
        <div className="flex flex-col text-center bg-white select-none rounded-lg w-[160px] py-2 px-2 mb-3 items-center mr-2">
          <h2 className="border-b border-blue-200 text-gray-700 text-sm pb-1">Usuários com deficiêcia</h2>
          <span className="text-gray-500 mt-1">{usersWithDeficiency.length}</span>
        </div>
        <div className="flex flex-col text-center bg-white select-none rounded-lg w-[160px] py-2 px-2 mb-3 items-center mr-2">
          <h2 className="border-b border-blue-200 text-gray-700 text-sm pb-1">Usuários sem deficiêcia</h2>
          <span className="text-gray-500 mt-1">{usersWithoutDeficiency.length}</span>
        </div>
      </div>
      <div className="mt-6">
        {
          !users.length ? (
            <Loading size={30}/>
          )
          :
          users.map((user, index) => {
            return (
              <Link href={``} key={index}>
                <a className="flex justify-between bg-white hover:bg-gray-100 duration-150 rounded-lg w-[500px] px-3 py-2 mb-3 items-center">
                  <div className="flex items-center">
                    <div>
                      <Image
                        src={user.photoURL}
                        alt="User Image"
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-[#323232] -mb-2">{user.name}</h2>
                      <span className="text-[#696969] text-sm">{user.email}</span>
                    </div>
                  </div>
                  <div>
                    <BsChevronRight size={21} />
                  </div>
                </a>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

export default Locations;
