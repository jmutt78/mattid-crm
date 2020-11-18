import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGoalsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useGoalsQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.goals.map((p) => <div key={p.id}>{p.monthGoalString}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);