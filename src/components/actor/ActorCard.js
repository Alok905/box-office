import React from "react";
import { StyledActorCard } from "./ActorCard.styled";

import NO_IMAGE_FOUND from "../../images/not-found.png";

const ActorCard = ({ image, name, gender, country, birthday, deathday }) => {
  return (
    <StyledActorCard>
      <div className="img-wrapper">
        <img src={image ? image : NO_IMAGE_FOUND} alt="actor" />
      </div>
      <h1>
        {name}
        {gender ? `${gender}` : null}
      </h1>
      <p>{country ? `Comes from ${country}` : "No country known"}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : "Alive"}</p>
    </StyledActorCard>
  );
};

export default ActorCard;
