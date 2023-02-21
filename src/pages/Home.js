import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { getApi } from "../misc/config";
import { useLastQuery } from "../misc/custom-hook";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const Home = () => {
  const [input, setInput] = useLastQuery("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowSearch = searchOption === "shows";

  const handleSearch = () => {
    console.log(searchOption);
    getApi(`/search/${searchOption}?q=${input}`)
      .then((result) => setResults(result))
      .catch((err) => console.log("error fetching the movies", err));
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const onRadioChange = (e) => {
    setSearchOption(e.target.value);
  };

  const renderResult = () => {
    if (results) {
      if (results.length) {
        return results[0].show ? (
          <ShowGrid data={results} />
        ) : (
          <ActorGrid data={results} />
        );
      } else {
        return <div>No Result</div>;
      }
    }
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            value="shows"
            onChange={onRadioChange}
            checked={isShowSearch}
            id="shows"
          />
        </div>
        <div>
          <CustomRadio
            label="People"
            value="people"
            onChange={onRadioChange}
            checked={!isShowSearch}
            id="people"
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button onClick={handleSearch}>Search</button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
