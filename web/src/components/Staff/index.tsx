import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useStaffsQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import { useIsAuth } from '../../utils/useIsAuth';
import CreateStaff from './CreateStaff';
import React from 'react';
import { DeleteStaffButton } from './DeleteStaff';
import EditStaff from './EditStaff';

const Staffs = () => {
  useIsAuth();
  const { data, error, loading, fetchMore, variables } = useStaffsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Flex mb={2} align='center'>
            <CreateStaff />
          </Flex>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data!.staffs.staffs.map((s) =>
                !s ? null : (
                  <Tr key={s.id}>
                    <Td>{s.name}</Td>
                    <Td>
                      <EditStaff id={s.id} name={s.name} />
                    </Td>
                    <Td>
                      <DeleteStaffButton id={s.id} creatorId={s.creator.id} />
                    </Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </>
      )}
      {data && data.staffs.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.staffs.staffs[data.staffs.staffs.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m='auto'
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default withApollo({ ssr: false })(Staffs);
