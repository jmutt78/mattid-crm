import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withApollo } from '../../utils/withApollo';
import { InputField } from '../Inputs/InputField';
import { useCreateStaffMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';

const CreateQuote: React.FC<{}> = ({}) => {
  const [createStaff] = useCreateStaffMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create Staff</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Staff</ModalHeader>

          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createStaff({
                variables: { input: values },
                update: (cache, { data }) => {
                  if (!data?.createStaff.errors) {
                    cache.evict({ fieldName: 'staffs:{}' });
                  }
                },
              });

              if (response.data?.createStaff.errors) {
                setErrors(toErrorMap(response.data.createStaff.errors));
                console.log(response.data.createStaff.errors);
              } else if (response.data?.createStaff.staff) {
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  {isSubmitting ? null : <ModalCloseButton />}
                  <ModalBody pb={6}>
                    <InputField
                      name='name'
                      placeholder='Name'
                      textarea
                      label='Name'
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      mr={2}
                      type='submit'
                      isLoading={isSubmitting}
                      background='blue'
                      color='white'
                    >
                      Save Staff
                    </Button>

                    <Button isLoading={isSubmitting} onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(CreateQuote);
