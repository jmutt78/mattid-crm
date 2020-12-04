import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGoalsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';

import { Link, Stack, Box, Heading, Text, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useGoalsQuery({
    variables,
  });
  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading>Matti D Goals</Heading>
        <NextLink href='/create-goal'>
          <Link ml='auto'>create Goal</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.goals.goals.map((p) => (
            <Box key={p.id} p={5} shadow='md' borderWidth='1px'>
              <Heading fontSize='xl'>{p.monthGoalString}</Heading>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.goals.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.goals.goals[data.goals.goals.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m='auto'
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
