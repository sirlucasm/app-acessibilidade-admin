// import Head from "next/head";
// import Image from "next/image";

const Home = () => {
  return (
    <div className="flex justify-center flex-col items-center h-[100vh] bg-primary">
      <div className="flex flex-col bg-white justify-between w-[400px]">
        <div className="border-b-2 text-center">
          <h3 className="my-3">BEM VINDO DE VOLTA!</h3>
        </div>
        <form className="px-14 py-6">
          <div className="my-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="my-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              bg-red-500
              type="password"
              placeholder="************"
              required
            />
          </div>
          <div>
            <button className="bg-cyan-500 border-radius: 0px	/100">
              Entrar
            </button>
          </div>
        </form>
        <div className="px-7 border-t-2 py-3">
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
