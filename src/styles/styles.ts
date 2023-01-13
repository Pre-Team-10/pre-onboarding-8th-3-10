import styled from "styled-components";

export const SearchFormContainer = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: blueviolet;
`;

export const SearchForm = styled.form`
  height: 100%;
  text-align: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 200px;
`;

export const Header = styled.header`
  width: 100%;
  display: block;
  margin-bottom: 25px;
  color: white;
  font-size: 20px;
`;

export const SearchWrapper = styled.div`
  height: 40px;
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 100%;
  padding-left: 10px;
  border-radius: 12px 0 0 12px;
  border: none;
  outline: none;
  color: blueviolet;
  font-weight: bolder;
`;

export const SearchButton = styled.button`
  width: 60px;
  height: 96%;
  border-radius: 0 12px 12px 0;
  border: none;
  outline: 1px solid white;
  color: white;
  background-color: blueviolet;
  overflow: hidden;
`;

export const SicksScrollList = styled.div`
  margin-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
`;

export const BoldedText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
`;

export const SickElem = styled.div<{ isTargetSick: boolean }>`
  padding: 2.5px 0;
  background-color: ${({ isTargetSick }) =>
    isTargetSick ? "rgba(255, 255, 255, 0.2)" : "none"};
  color: ${({ isTargetSick }) => (isTargetSick ? "white" : "black")};
  cursor: pointer;
`;
