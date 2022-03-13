import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams<"coinId">();

  return <h1>Coi: {coinId}</h1>;
}

export default Coin;
