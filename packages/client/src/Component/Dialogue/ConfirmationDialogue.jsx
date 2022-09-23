import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

export const ConfirmationDialogue = ({
  name,
  desc,
  func,
  id,
  param,
  color1,
  color2,
  color,
  icon,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <>
      <Button
        colorScheme={color1 ? color1 : 'teal'}
        onClick={onOpen}
        color={color}
      >
        {icon ? icon : name}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {name}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure want to {desc}.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme={color2 ? color2 : 'teal'}
                onClick={() => {
                  onClose();
                  id ? func(id, param) : func();
                }}
                ml={3}
              >
                {name}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
