import { useRouter } from "next/router";
import { Container } from "../../components/containers";
import { Loading } from "../../components/loading";

const ShowLocation = (params) => {
  const router = useRouter();
  const { id } = router.query;

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
