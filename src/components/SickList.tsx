import React from "react";
import { BoldedText, SickElem, SicksScrollList } from "../styles/styles";
import { ISick } from "../utils/cache";

function SickList({
  sicks,
  targetSickIndex,
  keyword,
  setTargetSickIndex,
}: {
  sicks: Array<ISick>;
  targetSickIndex: number;
  keyword: string;
  setTargetSickIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const keywordLen = keyword.length;
  return (
    <SicksScrollList>
      {sicks.map((sick, idx) => {
        const indexOfSickNm = sick.sickNm.indexOf(keyword);
        const lastIndexOfKeywordEnd = indexOfSickNm + keywordLen;
        const isTargetSick = targetSickIndex === idx;
        if (indexOfSickNm === -1)
          return (
            <SickElem key={sick.sickCd} isTargetSick={isTargetSick}>
              {sick.sickNm}
            </SickElem>
          );
        return (
          <SickElem
            key={sick.sickCd}
            isTargetSick={isTargetSick}
            onMouseOver={() => setTargetSickIndex(idx)}
          >
            {sick.sickNm.slice(0, indexOfSickNm)}
            <BoldedText>
              {sick.sickNm.slice(indexOfSickNm, lastIndexOfKeywordEnd)}
            </BoldedText>
            {sick.sickNm.slice(lastIndexOfKeywordEnd, sick.sickNm.length)}
          </SickElem>
        );
      })}
    </SicksScrollList>
  );
}

export default SickList;
