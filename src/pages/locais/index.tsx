import Link from "next/link";
import { Container } from "../../components/containers";
import { Loading } from "../../components/loading";
import { AiOutlinePlus } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { FaRegDotCircle } from 'react-icons/fa';
import { usePlaces } from "../../hooks/use-place";
import Image from "next/image";
import { generateAccessibleObj } from "../../utils/place";

const Locations = () => {
  const { places } = usePlaces();

  if (!places) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-2xl font-bold">Locais</h2>
      </div>
      <div className="mt-5">
        <Link href="/locais/novo">
          <a className="flex items-center justify-center bg-button-primary w-[135px] py-2 text-white text-sm">
            <AiOutlinePlus className="mr-2" color="#fff" size={21} />
            Novo Local
          </a>
        </Link>
      </div>
      <div className="mt-10">
        {
          !places.length ? (
            <Loading size={30}/>
          )
          :
          places.map((place, index) => {
            const accessibleObj = generateAccessibleObj(place.accessible);

            return (
              <Link href={`locais/${place.id}`} key={index}>
                <a className="flex justify-between bg-white hover:bg-gray-100 duration-150 rounded-lg w-[500px] p-4 mb-3 items-center">
                  <div className="flex">
                    <div>
                      <Image
                        src={place.thumbImage}
                        alt="Place Image Thumb"
                        width={95}
                        height={70}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-[#323232] -mb-2">{place.title}</h2>
                      <span className="text-[#696969] text-sm">{place.locality}</span>
                      <div className="mt-2 flex items-center">
                        <FaRegDotCircle className="mr-1.5" color={accessibleObj.color} />
                        <span style={{ color: accessibleObj.color }}>
                          {accessibleObj.text}
                        </span>
                      </div>
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
  )
}

export default Locations;
