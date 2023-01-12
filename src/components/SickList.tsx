import React from "react";
import { BoldedText, SickElem, SicksScrollList } from "../styles/styles";
import { ISick } from "../utils/cache";

function SickList({
  sicks,
  keyword,
}: {
  sicks: Array<ISick>;
  keyword: string;
}) {
  const keywordLen = keyword.length;
  return (
    <SicksScrollList>
      {sicks.map((sick) => {
        const indexOfSickNm = sick.sickNm.indexOf(keyword);
        const lastIndexOfKeywordEnd = indexOfSickNm + keywordLen;
        if (indexOfSickNm === -1)
          return <SickElem key={sick.sickCd}>{sick.sickNm}</SickElem>;
        return (
          <SickElem key={sick.sickCd}>
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
