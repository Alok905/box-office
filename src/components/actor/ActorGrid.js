import React from "react";
import { FlexGrid } from "../styled";
import ActorCard from "./ActorCard";

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          name={person.name}
          country={person.country?.name}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image?.medium}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
