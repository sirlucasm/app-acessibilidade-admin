import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { Alert } from "../../components/Alert";
import { Container } from "../../components/containers";
import { Loading } from "../../components/loading";
import { firestore } from "../../configs/firebase";
import { usePlace } from "../../hooks/use-place";

const ShowLocation = () => {
  const router = useRouter();
  const { id }: any = router.query;
  if (!id) return;

  const { place } = usePlace(id);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleDeletePlace = useCallback(() => {
    setOpenDeleteAlert(true);
  }, [openDeleteAlert]);

  const deletePlace = useCallback(async () => {
    const docRef = doc(firestore, 'places', place?.id);

    await toast.promise(deleteDoc(docRef), {
      pending: 'Excluindo local',
      success: 'Local excluido com sucesso'
    })
      .then(() => {
        setOpenDeleteAlert(false);
        router.replace('/locais')
      });
  }, [place]);

  if (!place) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-2xl">Local</h2>
      </div>
      <div className="mt-5">
        <button onClick={handleDeletePlace}>
          <a className="flex items-center justify-center bg-red-500 hover:bg-red-600 w-[135px] py-2 text-white text-sm">
            <BsTrash className="mr-2" color="#fff" size={21} />
            <span>Excluir local</span>
          </a>
        </button>
      </div>
      <div className="flex flex-col mt-7 max-w-[60vw]">
        <div className="flex items-center">
          <Image
            src={place?.thumbImage}
            alt="Place Image"
            width={400}
            height={250}
            className="rounded-lg"
          />
        </div>
        <div className="flex items-center mt-4">
          <h2 className="font-bold text-md">Titulo:</h2>
          <span className="ml-2 text-lg">{place?.title}</span>
        </div>
        <div className="flex">
          <h2 className="font-bold text-md">Descrição:</h2>
          <span className="ml-2 text-lg">{place?.description}</span>
        </div>
        <div className="flex items-center">
          <h2 className="font-bold text-md">Localização:</h2>
          <span className="ml-2 text-lg">{place?.locality}</span>
        </div>
      </div>
      <Alert
        isOpen={openDeleteAlert}
        onRequestClose={() => setOpenDeleteAlert(false)}
        title = 'Deseja excluir o local?'
        message='Esta ação não poderá ser desfeita'
        handleFunction={deletePlace}
      />
    </div>
  )
}

export default ShowLocation;
