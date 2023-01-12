import React, { useCallback, useEffect, useRef, useState } from "react";
import SickList from "../components/SickList";
import {
  Header,
  SearchButton,
  SearchForm,
  SearchFormContainer,
  SearchInput,
  SearchWrapper,
} from "../styles/styles";
import { KeyDownOrder, validKeywordRegex } from "../utils/etc";
import { ISick, sickSearchManager } from "../utils/cache";

let debounceTimeout: NodeJS.Timeout;
let isSickListInitialized = false;

function SearchPage() {
  const [sicks, setSicks] = useState<Array<ISick>>();
  const [keyword, setKeyword] = useState("");
  const [isDebounced, setIsDebounced] = useState(false);
  const [targetSickIndex, setTargetSickIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateSickListByKeyword = useCallback(
    async (inputValue: string) => {
      if (!inputValue) {
        setSicks([]);
        return;
      }
      const searchedSicks = await sickSearchManager.fetchSearchedSickList(
        inputValue,
      );
      if (searchedSicks) setSicks(searchedSicks);
      setTargetSickIndex(-1);
      isSickListInitialized = false;
    },
    [setSicks],
  );
  const handleOnInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSickListInitialized && sicks && sicks.length !== 0) {
      const keyCode = e.key || e.keyCode;
      if (
        (keyCode === KeyDownOrder.DOWN_KEY ||
          keyCode === KeyDownOrder.DOWN_KEYCODE) &&
        targetSickIndex < sicks.length - 1
      ) {
        setTargetSickIndex(targetSickIndex + 1);
      } else if (
        (keyCode === KeyDownOrder.UP_KEY ||
          keyCode === KeyDownOrder.UP_KEYCODE) &&
        targetSickIndex > 0
      ) {
        setTargetSickIndex(targetSickIndex - 1);
      }
    }
    isSickListInitialized = true;
  };
  useEffect(() => {
    setIsDebounced(false);
    debounceTimeout = setTimeout(() => {
      setIsDebounced(true);
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [keyword]);
  useEffect(() => {
    if (isDebounced) {
      if (inputRef.current) {
        const inputKeyword = inputRef.current.value;
        if (!validKeywordRegex.test(inputKeyword))
          updateSickListByKeyword(inputKeyword);
      }
    }
  }, [isDebounced, updateSickListByKeyword]);
  const doesSicksExist = sicks && sicks?.length !== 0;
  return (
    <SearchFormContainer>
      <SearchForm onSubmit={(e) => e.preventDefault()}>
        <Header>국내 모든 임상시험 검색하고 온라인으로 참여하기</Header>
        <SearchWrapper>
          <SearchInput
            ref={inputRef}
            onChange={(e) => setKeyword(e.currentTarget.value)}
            onKeyDown={handleOnInputKeyDown}
          />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        {doesSicksExist && (
          <SickList
            sicks={sicks}
            targetSickIndex={targetSickIndex}
            keyword={keyword}
            setTargetSickIndex={setTargetSickIndex}
          />
        )}
        {keyword && isDebounced && !doesSicksExist && <p>검색어 없음</p>}
      </SearchForm>
    </SearchFormContainer>
  );
}

export default SearchPage;
