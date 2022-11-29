import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdPlace } from 'react-icons/md';
import { toast } from "react-toastify";
import { Alert } from "../../../components/Alert";
import { Container } from "../../../components/containers";
import { Loading } from "../../../components/loading";
import { useAuthContext } from "../../../contexts/auth.context";
import { useUser } from "../../../hooks/use-user";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../configs/firebase";

const ShowUser = ({ id }) => {
  const router = useRouter();

  const { user } = useUser(id);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleDeleteUser = useCallback(() => {
    setOpenDeleteAlert(true);
  }, [openDeleteAlert]);

  const deleteUser = useCallback(async () => {
    const docRef = doc(firestore, 'users', user?.uid);
    const defRef = doc(firestore, 'deficiencies', user?.uid);

    await toast.promise(async () => {
      await deleteDoc(docRef);
      await deleteDoc(defRef);
    }, {
      pending: 'Excluindo usuário',
      success: 'Usuário excluido com sucesso'
    })
      .then(() => {
        setOpenDeleteAlert(false);
        router.replace('/usuarios');
      });
  }, [user]);

  if (!user) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-3xl">Usuário de id: {user?.uid}</h2>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <button
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 w-[135px] py-2 text-white text-sm"
          onClick={handleDeleteUser}
        >
          <BsTrash className="mr-2" color="#fff" size={21} />
          <span>Excluir usuário</span>
        </button>
        <Link href={`${user.uid}/editar`}>
          <a className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 w-[135px] py-2 text-white text-sm">
            <BsPencil className="mr-2" color="#fff" size={21} />
            <span>Editar usuário</span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-7 max-w-[45vw] bg-white p-5 rounded-md">
        <div className="flex items-center">
          <Image
            src={user?.photoURL}
            alt="User Image"
            width={90}
            height={90}
            layout="fixed"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-2xl text-gray-800">{user?.name}</span>
          </div>
          <div>
            <span className="text-xl text-gray-800">{user?.email}</span>
          </div>
          <div className="flex items-center text-gray-800">
            <h2 className="font-bold text-xl">Admin:</h2>
            <span className="ml-2 text-xl">{user?.admin ? 'sim' : 'não'}</span>
          </div>
        </div>
      </div>
      <Alert
        isOpen={openDeleteAlert}
        onRequestClose={() => setOpenDeleteAlert(false)}
        title = 'Deseja excluir o usuário?'
        message='Esta ação não poderá ser desfeita'
        handleFunction={deleteUser}
      />
    </div>
  )
}

export default ShowUser;

export const getServerSideProps = (ctx) => {
  return {
    props: {
      id: ctx.query.id
    }
  }
}
