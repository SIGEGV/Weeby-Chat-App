import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const UserListItem = ( {user ,handleFunction} ) => {


  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "	#0097ff",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      top="10%"
      px={3}
      py={2}
      mb={1}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />

      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>

    </Box>
  );
};

export default UserListItem;