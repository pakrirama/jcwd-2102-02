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
  func2,
  id,
  param,
  color1,
  color2,
  color,
  icon,
  variant,
  size,
  isDisabled,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <>
      <Button
        colorScheme={color1 ? color1 : 'teal'}
        variant={variant ? variant : 'solid'}
        size={size ? size : 'md'}
        onClick={onOpen}
        color={color}
        isDisabled={isDisabled ? isDisabled : false}
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
                  func && id ? func(id, param) : null;
                  func2 && id ? func2(id) : null;
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
