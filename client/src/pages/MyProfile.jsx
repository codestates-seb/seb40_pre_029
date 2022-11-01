import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Navigation from "../components/navigation/Navigation.jsx";

const MyProfile = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Navigation className="w-1/5" />
        <div className="w-4/5 flex" id="profileheader">
          MyProfile 페이지 입니다
          <div id="profilepicture">{/* <img src=""></img> */}</div>
          <div>
            <button></button>
            <button></button>
          </div>
          <div id="email"></div>
          <div id="nickname"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
