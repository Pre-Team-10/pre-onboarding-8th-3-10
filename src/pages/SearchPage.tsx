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
import { validKeywordRegex } from "../utils/etc";
import { ISick, sickSearchManager } from "../utils/cache";

let debounceTimeout: NodeJS.Timeout;

function SearchPage() {
  const [sicks, setSicks] = useState<Array<ISick>>();
  const [keyword, setKeyword] = useState("");
  const [isDebounced, setIsDebounced] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = e.currentTarget.value;
    setKeyword(inputValue);
  };
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
    },
    [setSicks],
  );
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
          <SearchInput ref={inputRef} onChange={handleSearchInputOnChange} />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        {doesSicksExist && <SickList sicks={sicks} keyword={keyword} />}
        {keyword && isDebounced && !doesSicksExist && <p>검색어 없음</p>}
      </SearchForm>
    </SearchFormContainer>
  );
}

export default SearchPage;
