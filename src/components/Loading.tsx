import React, { CSSProperties } from "react";
import "./CSS/Loading.css";

const Loading = () => {
  interface CSSvar extends CSSProperties {
    "--i": number;
  }

  return (
    <div className="loader-wrapper">
      {["L", "o", "a", "d", "i", "n", "g", ".", ".", "."].map(
        (character, index) => {
          return <span style={{ "--i": index } as CSSvar}>{character}</span>;
        }
      )}
    </div>
  );
};

export default Loading;
