import React, { useEffect, useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { getApi } from "../misc/config";
import { useShows } from "../misc/custom-hook";
import ShowGrid from "../components/show/ShowGrid";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => getApi(`/shows/${showId}`));
      // console.log(promises);
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
          console.log(results);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
