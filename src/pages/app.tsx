import { Container } from "../components/containers";
import { Loading } from "../components/loading";
import { useAuthContext } from "../contexts/auth.context";

const Application = () => {
  const { currentUser } = useAuthContext()

  if (!currentUser) return (
    <Container justifyContent="center" alignItems="center">
      <Loading size={50} />
    </Container>
  )

  return (
    <div>
      <span>App</span>
    </div>
  )
}

export default Application;