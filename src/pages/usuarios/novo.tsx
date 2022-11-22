import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GRAY_DARK } from "../../styles/colors";
import { useState, useCallback } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../configs/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const NewUser = () => {
  const [seePassword, setSeePassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

  const onSubmit = async () => {
    const body = {
      email: watch('email'),
      password: watch('password'),
      name: watch('name'),
      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      admin: watch('admin')
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, body.email, body.password);
      if (!user) {
        toast.error('Não foi possível criar usuário');
        return;
      }

      const docRef = doc(firestore, 'users', user.uid);
      const deficiencyDocRef = doc(firestore, 'deficiencies', user.uid);

      await toast.promise(async () => {
        await updateProfile(user, {
          displayName: body.name,
          photoURL: body.photoURL
        });

        await setDoc(docRef, {
          uid: user.uid,
          ...body
        });

        await setDoc(deficiencyDocRef, {
          userId: user.uid,
          data: [],
          reducedMobility: false
        });
      }, {
        pending: 'Cadastrando novo usuário',
        success: 'Usuário cadastrado com sucesso!'
      })
        .then(() => auth.signOut());
    } catch(error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const generatePassword = useCallback((
    length = 12,
  ) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let hash = '';
    for (var i = 0; i <= length; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      hash += chars.substring(randomNumber, randomNumber +1);
    }
    setValue('password', hash, { shouldValidate: true });
  }, []);

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-3xl font-bold">Novo usuário</h2>
      </div>
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
        <div>
          <div className="flex relative">
            <input
              type={seePassword ? 'text' : 'password'}
              className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Senha *"
              {...register("password", { required: true })}
            />
            <button
              type='button'
              className='absolute right-3 inset-y-0'
              onClick={() => setSeePassword(!seePassword)}
            >
              {
                seePassword ?
                <AiOutlineEyeInvisible size={22} color={GRAY_DARK} />
                :
                <AiOutlineEye size={22} color={GRAY_DARK} />
              }
            </button>
          </div>
          <div className="flex flex-col items-start">
            { errors.password && <span className="text-red-400 text-sm">Senha deve ser preenchida</span> }
            <button
              type='button'
              className='text-[15px]'
              onClick={() => generatePassword()}
            >
              <span className="text-blue-600">Gerar senha</span>
            </button>
          </div>
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
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewUser;
