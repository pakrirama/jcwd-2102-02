import { Box, Button, Image, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import UploadAvatar from './UploadAvatar';

export const AvatarEdit = ({ image_url }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Box w="280px" h="500px" align="center" py="50px">
      <Image
        mb={4}
        borderRadius="full"
        boxSize="200px"
        src={image_url}
        alt="Profile picture"
      />
      <Button my={'10'} colorScheme={'teal'} onClick={onToggle}>
        Change Image Picture
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <UploadAvatar onToggle={onToggle} />
      </Modal>
    </Box>
  );
};
