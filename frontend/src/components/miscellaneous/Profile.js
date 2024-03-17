import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
          null
      )}
      <Modal size="sm"  onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px" backgroundColor={"lightblue"} border={"2px solid rgba(255, 255, 255, 0.502);"}>
          <ModalCloseButton />
          <ModalBody >
           <Image
              borderRadius="full"
              boxSize="100px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              marginTop={"2%"}
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Username: {user.name}
            </Text>

            <Text
              marginTop={"6%"}
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;