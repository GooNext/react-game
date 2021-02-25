/* eslint-disable jsx-a11y/anchor-has-content */
const Footer = () => {
  return (
    <div
      style={{
        maxWidth: "300px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <a
        href="https://github.com/GooNext"
        target="_blank"
        rel="noopener noreferrer"
      >
        Author
      </a>
      <h5>2021 year</h5>
      <img
        src="https://rs.school/images/rs_school_js.svg"
        width="50px"
        alt="rs"
      />
    </div>
  );
};

export default Footer;
