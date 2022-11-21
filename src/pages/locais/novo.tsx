import axios from "axios";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";
import { generateAccessibleObj, PlaceDetails, PlacesTranslated } from "../../utils/place";
import { toast } from "react-toastify";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../configs/firebase";
import Modal from "react-modal";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const NewLocation = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [accessibilityList, setAccessibilityList] = useState([]);
  const [locationData, setLocationData] = useState<any>();
  const [isModalOpenAddDetails, setIsModalOpenAddDetails] = useState(false);

  const onSubmit = async (data) => {
    accessibilityList.forEach(async (al) => {
      await handleUploadProfileImage(al.image, al.title);
    });
    await handleUploadProfileImage(data.thumbImage);

    const thumbRef = ref(storage, `images/places/${data.title}/thumb`);

    data.thumbImage = await getDownloadURL(thumbRef);

    const docRef = doc(collection(firestore, 'places'));

    await toast.promise(setDoc(docRef, {
      accessibilityList,
      accessible: data.accessible,
      description: data.description,
      descriptionObs: data.descriptionObs,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      locality: data.locality,
      thumbImage: data.thumbImage,
      title: data.title
    }), {
      pending: 'Cadastrando novo local',
      success: 'Local cadastrado com sucesso!'
    })
      .then(() => router.replace('/locais'));
  }

  const handleOpenAddDetailsModal = () => setIsModalOpenAddDetails(true);

  const handleCloseAddDetailsModal = () => setIsModalOpenAddDetails(false);

  const addAccessibilityDetail = useCallback(async (e: any) => {
    e.preventDefault();
    const body = {
      title: watch('titleDetails'),
      description: watch('descriptionDetails'),
      accessible: watch('accessibleDetails'),
      image: !!watch('imageDetails').length && watch('imageDetails')
    }
    if (
      !body.title ||
      !body.description ||
      !body.accessible ||
      !body.image
    ) return;

    try {
      await toast.promise(handleUploadProfileImage(body.image, body.title), {
        pending: 'adicionando detalhe do local',
        success: 'Adicionado'
      });

      const imageRef = ref(storage, `images/places/${watch('title')}/${body.title}`);
      body.image = await getDownloadURL(imageRef);
    } catch (erro) {
      console.error(erro);
      toast.error('Erro ao fazer upload de imagem');
      throw new Error('Erro ao fazer upload de imagem');
    }

    setAccessibilityList((prev) => ([ ...prev, body ]));
    setValue('descriptionDetails', '');
    setIsModalOpenAddDetails(false);
  }, []);

  const handleLocalityBlur = useCallback(async () => {
    const locality = watch('locality');

    if (locality.trim() === '') return;

    let { data: localData } = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${locality}&polygon_geojson=1&format=jsonv2`);
    localData = localData[0];
    if (!localData) {
      toast.error('Local não encontrado');
      return
    }
    const { data: local } = await axios.get(`https://nominatim.openstreetmap.org/details.php?place_id=${localData.place_id}&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`);
    setLocationData(local);
    const { centroid: { coordinates }} = local;

    setValue('longitude', coordinates[0], { shouldValidate: true });
    setValue('latitude', coordinates[1], { shouldValidate: true });
  }, []);

  const handleUploadProfileImage = useCallback(async (imageFile: File[], title = 'thumb') => {
    const storageRef = ref(storage, `images/places/${watch('title')}/${title}`);
    await uploadBytes(storageRef, imageFile[0], { contentType: imageFile[0].type });
  }, []);

  const handleRemoveItemFromAccessibilityList = (pos: number) => {
    const clone = [...accessibilityList];

    clone.splice(pos, 1);
    setAccessibilityList(clone);
  }

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-2xl font-bold">Novo local</h2>
      </div>
      <form className="mt-5 w-[450px]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type='text'
            className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Título *"
            {...register("title", { required: true })}
          />
          { errors.title && <span className="text-red-400 text-sm">Título deve ser preenchido</span> }
        </div>
        <div>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Descrição *"
            {...register("description", { required: true })}
          />
          { errors.description && <span className="text-red-400 text-sm">Descrição deve ser preenchida</span> }
        </div>
        <div>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Obs. na descrição"
            {...register("descriptionObs")}
          />
        </div>
        <div>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("accessible")}
          >
            {
              PlacesTranslated.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))
            }
          </select>
        </div>
        <div>
          <input
            type='text'
            className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Localidade *"
            {...register("locality", { required: true })}
            onBlur={handleLocalityBlur}
          />
          { errors.locality && <span className="text-red-400 text-sm">Localidade deve ser preenchido</span> }
        </div>
        <div className="flex justify-between">
          <div>
            <input
              type='text'
              className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Latitude *"
              {...register("latitude", { required: true })}
            />
            { errors.latitude && <span className="text-red-400 text-sm">Latitude deve ser preenchida</span> }
          </div>
          <div>
            <input
              type='text'
              className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Longitude *"
              {...register("longitude", { required: true })}
            />
            { errors.longitude && <span className="text-red-400 text-sm">Longitude deve ser preenchida</span> }
          </div>
        </div>
        <div>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              my-1.5
            "
            accept="image/png, image/jpeg"
            id="thumb"
            {...register("thumbImage", { required: true })}
          />
          { errors.thumbImage && <span className="text-red-400 text-sm">Imagem de capa deve ser preenchida</span> }
        </div>
        <div>
          <button
            className={clsx("border-[1px] rounded border-gray-400 px-2 py-1.5 my-1.5 text-[#323232] text-sm")}
            onClick={handleOpenAddDetailsModal}
          >
            Adicionar detalhes *
          </button>
          <div>
            {
              accessibilityList.map((data, index) => {
                const accessibleObj = generateAccessibleObj(data.accessible);

                return (
                  <div key={index} className="mt-2 flex items-center">
                    <button onClick={() => handleRemoveItemFromAccessibilityList(index)} className="mr-2">
                      <AiOutlineClose size={16} />
                    </button>
                    <FaRegDotCircle className="mr-1.5" color={accessibleObj.color} />
                    <span>{data.title}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Modal
          isOpen={isModalOpenAddDetails}
          onRequestClose={handleCloseAddDetailsModal}
          style={{
            content: {
              width: 500,
              height: 400,
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
          <div>
            <div className="flex justify-between w-full mb-4">
              <div />
              <button onClick={handleCloseAddDetailsModal}>
                <AiOutlineClose size={18} />
              </button>
            </div>
            <div>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Título *"
                {...register("titleDetails", { required: true })}
              >
                {
                  PlaceDetails.map((data, index) => (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  ))
                }
              </select>
              { errors.titleDetails && <span className="text-red-400 text-sm">Título deve ser preenchido</span> }
            </div>
            <div>
              <input
                type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Descrição *"
                {...register("descriptionDetails", { required: true })}
              />
              { errors.descriptionDetails && <span className="text-red-400 text-sm">Descrição deve ser preenchida</span> }
            </div>
            <div>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("accessibleDetails")}
              >
                {
                  PlacesTranslated.map((data, index) => (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  my-1.5
                "
                accept="image/png, image/jpeg"
                id="imageDetails"
                {...register("imageDetails", { required: true })}
              />
              { errors.imageDetails && <span className="text-red-400 text-sm">Imagem com o detalhe deve ser adicionada</span> }
            </div>
            <button
              className="bg-button-primary disabled:bg-gray-400 w-[100px] py-1 mt-3 text-white text-sm"
              onClick={addAccessibilityDetail}
            >
              adicionar
            </button>
          </div>
        </Modal>
        <div>
          <button className="bg-button-primary disabled:bg-gray-400 w-[135px] py-3 mt-10 text-white uppercase text-xs">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewLocation;
