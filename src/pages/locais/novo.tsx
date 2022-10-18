import clsx from "clsx";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";
import { generateAccessibleObj, PlacesTranslated } from "../../utils/place";

const NewLocation = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [showAccessiblityDetails, setShowAccessiblityDetails] = useState(false);
  const [accessibilityList, setAccessibilityList] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleAccessibilityDetail = useCallback((e: any) => {
    e.preventDefault();
    setShowAccessiblityDetails(!showAccessiblityDetails);
  }, [showAccessiblityDetails]);

  const addAccessibilityDetail = useCallback((e: any) => {
    e.preventDefault();
    const body = {
      title: watch('titleDetails'),
      description: watch('descriptionDetails'),
      accessible: watch('accessibleDetails')
    }
    if (
      !body.title ||
      !body.description ||
      !body.accessible
    ) return;

    setAccessibilityList((prev) => ([ ...prev, body ]));
    setShowAccessiblityDetails(false);
    setValue('titleDetails', '');
    setValue('descriptionDetails', '');
    setValue('accessibleDetails', '');
  }, [showAccessiblityDetails]);

  const validateForm = useCallback(() => {
    if (
      watch('title') &&
      watch('description') &&
      watch('locality') &&
      watch('latitude') &&
      watch('longitude') &&
      watch('thumbImage') &&
      watch('accessible') &&
      accessibilityList.length
    ) return false;
    return true;
  }, []);

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
            id="thumb"
            {...register("thumbImage", { required: true })}
          />
          { errors.thumbImage && <span className="text-red-400 text-sm">Imagem de capa deve ser preenchida</span> }
        </div>
        <div>
          <button
            className={clsx("border-[1px] rounded border-gray-400 px-2 py-1.5 my-1.5 text-[#323232] text-sm", {
              ["border-red-400 text-red-400"]: showAccessiblityDetails
            })}
            onClick={handleAccessibilityDetail}
          >
            { !showAccessiblityDetails ? 'Adicionar detalhes' : <AiOutlineClose /> }
          </button>
          {
            showAccessiblityDetails ? (
              <div>
                <div>
                  <input
                    type='text'
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Título *"
                    {...register("titleDetails", { required: true })}
                  />
                  { errors.latitude && <span className="text-red-400 text-sm">Título deve ser preenchido</span> }
                </div>
                <div>
                  <input
                    type='text'
                    className="shadow appearance-none border rounded w-full py-2 px-3 my-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Descrição *"
                    {...register("descriptionDetails", { required: true })}
                  />
                  { errors.latitude && <span className="text-red-400 text-sm">Descrição deve ser preenchida</span> }
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
                <button
                  className="border-[1px] rounded border-green-400 px-2 py-1.5 my-1.5 text-green-400 text-sm"
                  onClick={addAccessibilityDetail}
                >
                  adicionar
                </button>
              </div>
            )
            : (
              <div>
                {
                  accessibilityList.map((data, index) => {
                    const accessibleObj = generateAccessibleObj(data.accessible);

                    return (
                      <div key={index} className="mt-2 flex items-center">
                        <FaRegDotCircle className="mr-1.5" color={accessibleObj.color} />
                        <span>{data.title}</span>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
        <div>
          <button disabled={!!validateForm()} className="bg-button-primary disabled:bg-gray-400 w-[135px] py-3 mt-10 text-white uppercase text-xs">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewLocation;
