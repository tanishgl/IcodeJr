import Contact from "./Contact";
import "./App.css";

const App = () => {
  return (
    <>
      <h1 className="title"> My Contacts project </h1>
      <div className="contacts">
        <Contact name="Name" phoneNo="Phone Number" email="Email"></Contact>
        <Contact
          name="Tanish"
          phoneNo="1010101010"
          email="tan@gmail.com"
        ></Contact>
        <Contact
          name="Lucy"
          phoneNo="2020202020"
          email="lucy@gmail.com"
        ></Contact>
        <Contact
          name="Nadia"
          phoneNo="9922992299"
          email="nad29@gmail.com"
        ></Contact>
      </div>
    </>
  );
};

export default App;
