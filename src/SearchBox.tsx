import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ISicks, instance } from "./Axios";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #cae9ff;
`;

const SearchBoxWrap = styled.div`
  width: 700px;
  height: 920px;
  margin: 0 auto;
  padding: 80px;
  text-align: center;
  border-radius: 21px;
`;

const SearchBoxTitle = styled.h2`
  margin: 20px 0 40px;
  font-size: 31px;
`;

const SearchInputWrap = styled.form`
  display: flex;
  justify-content: space-between;
  width: 478px;
  margin: 0 auto;
  line-height: 3;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 31px;
  background: #fff;

  &:focus-within {
    border: 2px solid rgb(0, 123, 233);
  }
`;

const SearchBoxIconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50px;
`;

const SearchInput = styled.input`
  all: unset;
  width: 350px;
  padding: 5px;
  font-size: 17px;
  text-align: left;
`;

const SearchInputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 3px;
  top: 3px;
  border-radius: 100%;
  width: 55px;
  height: 55px;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  background-color: #007be9;
  color: #fff;
`;

const SearchButtonIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListWrap = styled.ul`
  flex-direction: column;
  width: 450px;
  max-height: 500px;
  margin: 10px auto;
  padding: 10px 25px;
  border-radius: 11px;
  background-color: #fff;
  overflow-y: scroll;
`;

const List = styled.li`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px 0px;
  font-size: 17px;
  font-weight: 300;
  text-decoration: none;
  text-align: left;
  list-style: none;

  &:nth-child(2) {
    padding: 35px 0px 10px;
  }

  &:nth-child(2)::before {
    content: "추천 검색어";
    position: absolute;
    top: 5px;
    font-size: 13px;
    color: #999;
  }
`;

const TypeKeyword = styled.li`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  font-size: 17px;
  font-weight: 900;
  text-decoration: none;
  text-align: left;
  list-style: none;
`;

const SearchBoxListIconBox = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16px;
  padding-right: 15px;
`;

function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [sickApiData, setSickApiData] = useState<Array<ISicks>>([]);

  async function getApis(param: string): Promise<ISicks[] | undefined> {
    const keywordData = {
      params: {
        sickNm_like: param,
      },
    };
    try {
      const response = await instance.get(`?q=`, keywordData);
      console.log(response.data);
      setSickApiData(response.data);
      return [];
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchText(value);
    // console.log(getApis(searchText));
    // getApis(searchText);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {}, 500);
    return () => clearTimeout(debounce);
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      getApis(searchText);
    } else {
      setSearchText("");
    }
  }, [searchText]);

  return (
    <Container>
      <SearchBoxWrap>
        <SearchBoxTitle>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </SearchBoxTitle>
        <SearchInputWrap>
          <SearchBoxIconBox>
            <svg
              viewBox="0 0 16 16"
              fill="#a9af97"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              width={19}
              height={19}
            >
              <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
            </svg>
          </SearchBoxIconBox>
          <SearchInput
            type="text"
            placeholder="질환명을 입력해 주세요."
            value={searchText}
            onChange={handleTextChange}
          />
          <SearchInputButton type="submit" onClick={(e) => e.preventDefault()}>
            <SearchButtonIconWrap>
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
            </SearchButtonIconWrap>
          </SearchInputButton>
        </SearchInputWrap>
        <ListWrap
          style={{
            display: searchText.length === 0 ? "none" : "flex",
          }}
        >
          <TypeKeyword>
            <SearchBoxListIconBox>
              <svg
                viewBox="0 0 16 16"
                fill="#a9af97"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
              >
                <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
              </svg>
            </SearchBoxListIconBox>
            {searchText}
          </TypeKeyword>
          {sickApiData?.map((sickData) => {
            return (
              <List key={sickData.sickCd}>
                <SearchBoxListIconBox>
                  <svg
                    viewBox="0 0 16 16"
                    fill="#a9af97"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                  >
                    <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
                  </svg>
                </SearchBoxListIconBox>
                {sickData.sickNm}
              </List>
            );
          })}
        </ListWrap>
      </SearchBoxWrap>
    </Container>
  );
}

export default SearchBox;
