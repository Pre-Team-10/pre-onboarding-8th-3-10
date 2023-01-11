import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #cae9ff;
`;

const SearchBoxWrap = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
  padding: 80px;
  text-align: center;
  border: 1px solid #333;
  border-radius: 21px;
`;
const SearchInputWrap = styled.form`
  display: flex;
  justify-content: space-between;
  width: 428px;
  margin: 0 auto;
  line-height: 3;
  border-radius: 31px;
  background: #fff;
`;
const SearchInput = styled.input`
  all: unset;
  width: 350px;
  padding: 5px 5px 5px 20px;
  text-align: left;
`;

const SearchInputButton = styled.button`
  display: flex;
  border-radius: 100%;
  width: 58px;
  height: 58px;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  background-color: #007be9;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
`;

const SearchIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchBox() {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchText(value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("디바운스 입력:", searchText);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <Container>
      <SearchBoxWrap>
        <h2>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h2>
        <SearchInputWrap>
          <SearchInput
            type="text"
            placeholder="질환명을 입력해 주세요."
            value={searchText}
            onChange={handleTextChange}
          />
          <SearchInputButton type="submit">
            <SearchIconWrap>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={21}
              >
                <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
              </svg>
            </SearchIconWrap>
          </SearchInputButton>
        </SearchInputWrap>
      </SearchBoxWrap>
    </Container>
  );
}

export default SearchBox;
