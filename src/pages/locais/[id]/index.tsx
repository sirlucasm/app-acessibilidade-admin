import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Alert } from "../../../components/Alert";
import { Container } from "../../../components/containers";
import { Loading } from "../../../components/loading";
import { firestore } from "../../../configs/firebase";
import { usePlace } from "../../../hooks/use-place";
import { generateAccessibleObj } from "../../../utils/place";
import Modal, { Props } from "react-modal";

const ShowLocation = ({ id }) => {
  const [openAccessibilityDetailsModal, setOpenAccessibilityDetailsModal] = useState(false);
  const [accessibilitySelected, setAccessibilitySelected] = useState<any>();
  const router = useRouter();

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

  const handleOpenAccessibilityDetailsModal = (item) => {
    setAccessibilitySelected(item);
    setOpenAccessibilityDetailsModal(true);
  }

  const handleCloseAccessibilityDetailsModal = () => {
    setOpenAccessibilityDetailsModal(false);
    setAccessibilitySelected(undefined);
  }

  if (!place) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  const accessibleObj = generateAccessibleObj(place.accessible);

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-3xl">Local</h2>
      </div>
      <div className="mt-5">
        <button onClick={handleDeletePlace}>
          <a className="flex items-center justify-center bg-red-500 hover:bg-red-600 w-[135px] py-2 text-white text-sm">
            <BsTrash className="mr-2" color="#fff" size={21} />
            <span>Excluir local</span>
          </a>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-7 bg-white max-w-[60vw] p-5 rounded-md">
        <div>
          <Image
            src={place?.thumbImage}
            alt="Place Image"
            width={400}
            height={250}
            layout="fixed"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <h2 className="font-bold text-2xl text-gray-800">{place?.title}</h2>
          </div>
          <div className="mt-4">
            <p className="text-xl text-gray-600">{place?.description}</p>
          </div>
          <div className="flex items-start mt-4 text-gray-800">
            <h2 className="font-bold text-xl">Localização:</h2>
            <span className="ml-2 text-xl">{place?.locality}</span>
          </div>
          <div className="mt-2 flex items-center text-lg font-semibold">
            <FaRegDotCircle className="mr-1.5" color={accessibleObj.color} />
            <span style={{ color: accessibleObj.color }}>
              {accessibleObj.text}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 flex-wrap mt-4 bg-white max-w-[60vw] p-5 rounded-md">
        {
          place?.accessibilityList.map((item, index) => {
            const accessibleItem = generateAccessibleObj(item.accessible);
            return (
              <button className="mt-2 flex items-center" key={index} onClick={() => handleOpenAccessibilityDetailsModal(item)}>
                <FaRegDotCircle className="mr-1.5" color={accessibleItem.color} />
                <span style={{ color: accessibleItem.color, fontWeight: 600 }}>
                  {item.title}
                </span>
              </button>
            );
          })
        }
      </div>
      <Modal
        isOpen={openAccessibilityDetailsModal}
        onRequestClose={handleCloseAccessibilityDetailsModal}
        style={{
          content: {
            width: 500,
            height: 480,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            background: 'rgba(0, 0, 0, .4)'
          }
        }}
      >
        <div className="flex flex-col items-center">
          <div>
            <h2 className="text-2xl text-gray-800">{accessibilitySelected?.title}</h2>
          </div>
          <div className="mt-4">
            <Image
              src={accessibilitySelected?.image}
              alt="Place Image"
              width={400}
              height={250}
              layout="fixed"
              className="rounded-lg"
            />
          </div>
          <div className="text-center mt-3">
            <span className="text-[19px] text-gray-600">Descrição:</span>
            <h2 className="text-xl text-gray-500">{accessibilitySelected?.description}</h2>
          </div>
        </div>
      </Modal>
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

export const getServerSideProps = (ctx) => {
  return {
    props: {
      id: ctx.query.id
    }
  }
}
