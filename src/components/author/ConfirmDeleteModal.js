import React, { useContext } from 'react';
import { AuthorStore } from '../../contexts/AuthorStore';
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

const ConfirmDeleteModal = ({ author, clearCondemned }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { store } = useContext(AuthorStore);

  if (author && !isOpen) {
    onOpen();
  }

  const deleteAuthor = (author) => {
    store.destroy(author.id);
    clearCondemned();
    onClose();
  };

  const cancelDeletion = () => {
    clearCondemned();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={cancelDeletion} isCentered>
      <ModalOverlay />
      <ModalContent>
        {author && (
          <>
            <ModalHeader>Remove author</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you wish to remove <i>{author.name}</i>?
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={cancelDeletion}>
                Cancel
              </Button>
              <Button onClick={() => deleteAuthor(author)}>Remove</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
