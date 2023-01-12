import React from "react";
import { SickElem, SicksScrollList } from "../styles/styles";
import { ISick } from "../utils/cache";

function SickList({ sicks }: { sicks: Array<ISick> }) {
  return (
    <SicksScrollList>
      {sicks.map((sick) => (
        <SickElem key={sick.sickCd}>{sick.sickNm}</SickElem>
      ))}
    </SicksScrollList>
  );
}

export default SickList;
