import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';

const ConfirmDeleteModal = ({ book, clearCondemned }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (book && !isOpen) {
    onOpen();
  }

  const cancelDeletion = () => {
    clearCondemned();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={cancelDeletion} isCentered>
      <ModalOverlay />
      <ModalContent>
        {book && (
          <>
            <ModalHeader>Remove book</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you wish to remove <i>{book.name}</i> by{' '}
              {book.authors.map((author) => author.name).join(' ,')} from your
              library?
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={cancelDeletion}>
                Cancel
              </Button>
              <Button variant="ghost">Remove</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
