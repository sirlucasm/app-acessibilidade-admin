import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { firestore } from "../../../configs/firebase";

const EditUser = ({ user }) => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      admin: user.admin
    }
  });

  const onSubmit = async () => {
    const body = {
      email: watch('email'),
      name: watch('name'),
      admin: watch('admin')
    }
    try {
      const docRef = doc(firestore, 'users', user.uid);

      await toast.promise(async () => {
        await updateDoc(docRef, {
          ...body
        });
      }, {
        pending: 'Cadastrando novo usuário',
        success: 'Usuário cadastrado com sucesso!'
      })
        .then(() => router.replace(`/usuarios/${user.uid}`));
    } catch(error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-3xl font-bold">Editar usuário</h2>
      </div>

      <div>
        <form className="mt-5 w-[450px]" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type='text'
              className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nome *"
              {...register("name", { required: true })}
            />
            { errors.name && <span className="text-red-400 text-sm">Nome deve ser preenchido</span> }
          </div>
          <div>
            <input
              type='email'
              className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email *"
              {...register("email", { required: true })}
            />
            { errors.email && <span className="text-red-400 text-sm">Email deve ser preenchido</span> }
          </div>
          <div className="form-check mt-3">
            <input
              className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              id="flexCheckDefault"
              {...register("admin")}
            />
            <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
              Admin
            </label>
          </div>

          <div>
            <button className="bg-button-primary disabled:bg-gray-400 w-[135px] py-3 mt-6 text-white uppercase text-xs">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const docRef = doc(firestore, 'users', id);
  const res = await getDoc(docRef);

  return {
    props: {
      user: res.data()
    }
  }
}
