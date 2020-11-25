import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateGoalMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreateGoal: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createGoal] = useCreateGoalMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ monthGoalString: ""}}
        onSubmit={async (values) => {
          const { error } = await createGoal({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="monthGoalString" placeholder="goal..." label="Goal" />
            <Box mt={4}>

            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateGoal);