import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  CircularProgress,
} from "@chakra-ui/react";

export default function ModalProgress(props) {
  return (
    <>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={props.isOpen}
        // onClose={props.onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg="none" border="0">
          <Center>
            <CircularProgress isIndeterminate color="green.300" />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
