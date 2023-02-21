import React from "react";
import { Detailswrapper } from "./Details.styled";

const Details = ({ status, premiered, network }) => {
  return (
    <Detailswrapper>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>
        Premiered {premiered} {network ? `on ${network.name}` : null}
      </p>
    </Detailswrapper>
  );
};
export default Details;
