import React from 'react';
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
import { useUpdateStaffMutation } from '../../generated/graphql';

interface EditQuoteProps {
  id: number;
  name: string;
}

const EditStaff: React.FC<EditQuoteProps> = ({ id, name }) => {
  const [updateStaff] = useUpdateStaffMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit quote</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ name }}
            onSubmit={async (values) => {
              await updateStaff({ variables: { id: id, ...values } });
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <InputField
                    name='name'
                    placeholder='name'
                    label='Name'
                    textarea
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    mr={3}
                    type='submit'
                    isLoading={isSubmitting}
                    background='blue'
                    color='white'
                  >
                    update quote
                  </Button>

                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(EditStaff);
