# 이슈 트래킹 기능 구현하기 (세션 3주차)

**목차**

- [1.프로젝트 소개](#프로젝트-소개)
- [2.팀원 소개](#팀원-소개)
- [3.구현 기능](#구현-기능)
- [4.프로젝트 폴더 구조](#프로젝트-폴더-구조)
- [5.Best Practice 선정 사례](#Best-Practice-선정-사례)

## 프로젝트 소개

개발 기간: 23.01.10 ~ 23.01.13

### 배포 링크

[배포 링크](https://pre-onboarding-8th-3-10.vercel.app)

### 구동 방법

```tsx
npm install
npm start
```

### api 서버 링크 및 구동 방법

[저장소 링크](https://github.com/walking-sunset/assignment-api_8th)

```tsx
git clone https://github.com/walking-sunset/assignment-api_8th.git
npm install
npm start
```

### 사용한 라이브러리

<div>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" />
	<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
</div>

## 팀원 소개

---

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/jdy8739"><img src="https://avatars.githubusercontent.com/u/83811826?v=4" width="100px;" alt=""/><br /><sub><b>FE 팀장: 정도영 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/smash009"><img src="https://avatars.githubusercontent.com/u/46629029?v=4" width="100px;" alt=""/><br /><sub><b>FE 팀원: 남장현</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/SkyRain1225"><img src="https://avatars.githubusercontent.com/u/97310823?v=4" width="100px;" alt=""/><br /><sub><b>FE 팀원: 오경준</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/ddaisylee"><img src="https://avatars.githubusercontent.com/u/88873956?v=4" width="100px;" alt=""/><br /><sub><b>FE 팀원: 이은지</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/jazzyfact"><img src="https://avatars.githubusercontent.com/u/51365114?v=4" width="100px;" alt=""/><br /><sub><b>FE 팀원: 임혜미</b></sub></a><br /></td>
     <tr/>
  </tbody>
</table>

## 구현 기능

---

## 📝 구현 기능 목록

<br>

### **👋 1. 이슈 목록 보기**

    - [x] 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
    - [x] API 호출 최적화
    - [x] 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br>

- [x] 검색어 추천 기능

  - [x] 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
  - [x] 검색어가 없을 시 “검색어 없음” 표출

<br>

- [x] API 호출 최적화

  - [x] API 호출별로 로컬 캐싱 구현
  - [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  - [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

<br>

- [x] 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br>

### **👋 구현 조건**

- [x] - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

## 프로젝트 폴더 구조

---

```tsx
src
 ┣ components
 ┃ ┗ SickList.tsx
 ┣ pages
 ┃ ┗ SearchPage.tsx
 ┣ styles
 ┃ ┣ globalStyle.ts
 ┃ ┗ styles.ts
 ┣ utils
 ┃ ┣ cache.ts
 ┃ ┗ etc.ts
 ┣ App.tsx
 ┗ index.tsx
```

### components 폴더

1. 검색어 입력으로 인한 sick 정보를 리스트로 보여주는 컴포넌트를 분리해 설계

### styles 폴더

1. 하나의 styles 파일에 모든 컴포넌트 스타일을 작성
2. 초기 css 설정값을 수정하기 위한 globalStyle 파일 작성

### pages 폴더

1. sick 정보를 검색할 수 있는 페이지를 제작

### utils 폴더

1. cache 스토리지를 사용하는 비즈니스 로직들을 하나의 관심사를 가진 class로 만들고 그 인스턴스를 export하는 cache.ts 파일을 설계
2. 완성되지 않은 자음과 모음으로 이루어진 음절을 검색하지 않도록 하는 정규 표현식 및 비즈니스 로직에 사용되는 enum 및 상수들을 export하는 etc.ts 파일 제작

## Best Practice 선정 사례

---

### 1. 추천 검색어 caching 및 cache storage의 사용이라는 하나의 관심사로 class 제작

```ts
/*
caching이라는 하나의 관심사를 가진 interface를 만들고 그것을 구현하는 class를 제작했습니다.
외부에 노출될 필요없는 필드와 메소드들은 private 키워드를 사용해 캡슐화를 수행했으며,
외부에서 호출할 수 있는 하나의 메소드만을 다루도록 하여 이 인스턴스가 캐싱 및 캐싱된 http 응답을 재사용하는 비즈니스 로직을 수현하였습니다.
*/

interface ISickSearchManager {
  fetchSearchedSickList: (keyword: string) => Promise<Array<ISick> | null>;
}

class SickSearchManager implements ISickSearchManager {
  private sickCache: Cache | undefined;

  private requestURL = "";

  constructor() {
    this.makeCacheStorage();
  }

  private makeCacheStorage() {
    window.caches.open(CACHE_NAME).then((cache) => {
      this.sickCache = cache;
    });
  }

  async fetchSearchedSickList(keyword: string) {
    this.requestURL = `${BASE_URL}?q=${keyword}`;
    let searchedSicks = null;
    try {
      const cachedSickList = await this.findSearchedSickList();
      if (!cachedSickList) {
        console.log("calling api");
        await this.saveSearchedSickListInCacheStorage();
        return await this.findSearchedSickList();
      }
      searchedSicks = cachedSickList;
    } catch (e) {
      const { name } = e as Error;
      toast.error(name || "정보를 불러오는데 실패했습니다.");
    }
    return searchedSicks;
  }

  private async saveSearchedSickListInCacheStorage() {
    try {
      await this.sickCache?.add(this.requestURL);
    } catch (e) {
      const { name: errorName } = e as Error;
      if (
        errorName === CacheError.QUOTA_EXCEEDED ||
        errorName === CacheError.DOM
      ) {
        await this.sickCache?.delete(CACHE_NAME);
        this.makeCacheStorage();
      }
    }
  }

  private async findSearchedSickListInCacheStorage() {
    const cachedResponse = await this.sickCache?.match(this.requestURL);
    if (cachedResponse) {
      const sickList = (await cachedResponse.json()) as Array<ISick>;
      return sickList;
    }
    return null;
  }
}
```

- [x] 어플리케이션이 로드될 때, 위 클래스의 인스턴스가 생성되고 생성자에서 cache 저장소를 생성하는 메소드를 호출합니다.
- [x] 검색어에 맞는 http 요청의 결과가 cache 저장소에 존재한다면 요청을 수행하지 않고 cache된 결과를 반환합니다.
- [x] 만약 요청의 결과가 존재하지 않는다면 http 요청을 수행하고 cache 저장소에 저장 후 그 결과를 반환합니다.
- [x] 직관적인 함수명으로 메소드의 역할을 명확하고 상세하게 알 수 있도록 했습니다.
- [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정했습니다.

### 2. debouncing을 활용한 API 호출 최적화 전략

```ts
/*
먼저 검색 최적화를 수행하기 위해 useEffect의 콜백함수 내부에서 setTimeout을 활용해 debounce 유무의 값을 가지는 state를 변경하도록 하였습니다.
사용자가 검색창에서 값을 입력하면 useEffect의 콜백함수가 반환하는 cleartimeout 수행 함수를 통해 debounce를 true로 변경하는 timeout을 초기화하였으며, 입력이 없는 경우 true로 변환된 debounce 상태가 다시 밑의 useEffect의 콜백함수를 실행하도록 하여 현재의 검색어에 일치하는 결과를 불러오는 작업을 수행하도록 하였습니다.
*/

useEffect(() => {
  setIsDebounced(false);
  debounceTimeout = setTimeout(() => {
    setIsDebounced(true);
  }, 1000);
  return () => clearTimeout(debounceTimeout);
}, [keyword]);
useEffect(() => {
  if (isDebounced && inputRef.current) {
    const inputKeyword = inputRef.current.value;
    if (!validKeywordRegex.test(inputKeyword))
      updateSickListByKeyword(inputKeyword);
  }
}, [isDebounced, updateSickListByKeyword]);
```

- [x] debouncing의 개념을 활용하여 입력마다 API를 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행을 구현했습니다.

### 3. 사용자가 입력한 텍스트와 일치하는 부분 볼드처리

```ts
/*
문장에서 일치하는 검색어의 볼드처리를 위해 문장에서 검색어가 시작되는 부분, 검색어가 끝나는 부분을 indexOf 함수를 사용해 구하고 그 값을 변수에 저장했습니다.
그 변수들을 사용해서 문장을 세 부분으로 나누고 검색어와 일치하는 중간 부분만 볼드처리를 수행했습니다.
*/

const indexOfSickNm = sick.sickNm.indexOf(keyword);
const lastIndexOfKeywordEnd = indexOfSickNm + keywordLen;
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
```

- [x] 사용자가 검색한 키워드를 기준으로 slice 함수를 사용해 검색 결과를 세 부분으로 분리하여 검색 키워드와 일치하는 중간 부분만 Styled-components를 통해 볼드 처리를 구현했습니다.

### 4. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

```ts
/*
유저의 키보드 움직임을 감지해 arrow up, arrow down 키가 입력되는지 아래의 함수를 통해 검사하였고, 입력값과 해당 키가 일치한다면
targetSickIndex라는 컴포넌트의 state를 변경하여 어느 sick 리스트의 index가 선택되었는지 styled-components의 props 주입을 통해
요소들의 css 스타일을 시각적으로 변경하여 추천 검색어들을 선택 기능을 구현했습니다.
*/

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
```

```ts
const isTargetSick = targetSickIndex === idx;
return (
  <SickElem key={sick.sickCd} isTargetSick={isTargetSick}>
    {sick.sickNm}
  </SickElem>
);
```

```ts
export const SickElem = styled.div<{ isTargetSick: boolean }>`
  padding: 2.5px 0;
  background-color: ${({ isTargetSick }) =>
    isTargetSick ? "rgba(255, 255, 255, 0.2)" : "none"};
  color: ${({ isTargetSick }) => (isTargetSick ? "white" : "black")};
  cursor: pointer;
`;
```

- [x] 컴포넌트의 state와 리스트의 인덱스값과 그 state값이 일치하는지 여부를 styled-components의 props로 주입하여 키보드를 통한 추천 검색어 이동을 구현했습니다.

### 예외 처리

```ts
private async saveSearchedSickListInCacheStorage() {
  try {
    await this.sickCache?.add(this.requestURL);
  } catch (e) {
    const { name: errorName } = e as Error;
    if (
      errorName === CacheError.QUOTA_EXCEEDED ||
      errorName === CacheError.DOM
    ) {
      await this.sickCache?.delete(CACHE_NAME);
      this.makeCacheStorage();
    }
  }
}
```

- [x] try...catch 문과 react-toast를 사용해 cache 저장소에서 발생할 수 있는 에러 상황을 처리하도록 했습니다. (저장소 용량 과부하 등)
