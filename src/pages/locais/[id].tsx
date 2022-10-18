import Link from "next/link";
import { MdPlace } from 'react-icons/md';
import { Container } from "../../components/containers";
import { Loading } from "../../components/loading";
import { useAuthContext } from "../../contexts/auth.context";

const ShowLocation = ({ id }) => {
  if (!id) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div className="flex flex-col p-10 h-[100vh] bg-primary">
      <div className="">
        <h2 className="text-2xl">Local</h2>
      </div>
      <div className="flex items-center mt-7">
        
      </div>
    </div>
  )
}

export default ShowLocation;