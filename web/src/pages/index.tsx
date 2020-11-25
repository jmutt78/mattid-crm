import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGoalsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ data }] = useGoalsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout variant="regular">
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.goals.map((p) => <div key={p.id}>{p.monthGoalString}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);