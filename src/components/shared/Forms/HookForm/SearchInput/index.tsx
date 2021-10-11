/* eslint-disable react/no-children-prop */
import {
  UnorderedList,
  ListItem,
  Popover,
  useDisclosure,
  PopoverContent,
  useMergeRefs,
  Box,
  PopoverTrigger,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../../../../../hooks/useDebounce";
import { queryClient } from "../../../../../services/queryClient";
import { InputForm } from "../Input";

import { IInputProps } from "./@interfaces";

const Input = ({
  options,
  name,
  onChangeValue,
  ...rest
}: IInputProps): JSX.Element => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(options || []);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const { ref, onBlur } = register(name);
  const refs = useMergeRefs(firstFieldRef, ref);

  function compareString(option: string, search: string) {
    return option
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-zA-Z0-9s]/g, "")
      .includes(
        search
          .toLowerCase()
          .normalize("NFD")
          .replace(/[^a-zA-Z0-9s]/g, "")
      );
  }

  function onSearchValues(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;

    setIsSearching(false);
    setSearchResults(options.filter((i) => compareString(i, search)));
  }

  const { onDebounce } = useDebounce<ChangeEvent<HTMLInputElement>>(
    onSearchValues,
    500
  );

  const handleStartDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    onDebounce(e);
  };

  const handleSelectItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    e.preventDefault();
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
      setValue(name, item);
    }
  };

  const onBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClose();
    onBlur(e);
  };
  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        initialFocusRef={firstFieldRef}
        onClose={onClose}
        placement="bottom-start"
      >
        <InputForm
          placeholder="Valor pretendido de entrada"
          error={errors[name]}
          onChangeValue={handleStartDebounce}
          {...rest}
          {...register(name)}
          ref={refs}
          autoComplete={"off"}
          onFocus={onOpen}
          onBlur={onBlurInput}
        />
        <PopoverTrigger>
          <Box />
        </PopoverTrigger>
        <PopoverContent
          w={"calc(100%)"}
          onMouseDown={(e) => e.preventDefault()}
          p={5}
        >
          <UnorderedList maxH={400} overflowY={"auto"} m={0}>
            {!isSearching ? (
              searchResults.map((item) => (
                <ListItem listStyleType={"none"} key={item}>
                  <Button
                    onMouseDown={(e) => handleSelectItem(e, item)}
                    variant={"ghost"}
                  >
                    <Text
                      textOverflow="ellipsis"
                      overflow="hidden"
                      textAlign="start"
                      whiteSpace="nowrap"
                    >
                      {item}
                    </Text>
                  </Button>
                </ListItem>
              ))
            ) : (
              <Button variant={"ghost"} isLoading={true} />
            )}
          </UnorderedList>
        </PopoverContent>
      </Popover>
    </>
  );
};

export const SearchInput = Input;
