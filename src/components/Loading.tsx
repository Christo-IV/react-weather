import "./CSS/Loading.css";

const Loading = () => {
  return (
    <div className="loader-wrapper">
      {["L", "o", "a", "d", "i", "n", "g", ".", ".", "."].map(
        (character, index) => {
          let style = { "--i": index };

          // I don't know what this error is exactly,
          // but it doesn't seem to interfere ¯\_(ツ)_/¯

          return <span style={style}>{character}</span>;
        }
      )}
    </div>
  );
};

export default Loading;
