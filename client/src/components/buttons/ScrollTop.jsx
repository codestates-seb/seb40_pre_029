//advanced
export default function ScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="flex w-8 h-8" onClick={scrollToTop}>
      <img src={require("../images/arrow-button.png")} alt="" />
    </button>
  );
}
