import "./Contact.css";

const Contact = (props) => {
  const { name, phoneNo, email, dob } = { ...props };
  return (
    <div className="contact">
      <h2 className="name"> {name} </h2>
      <p className="phone"> {phoneNo} </p>
      <p className="email"> {email} </p>
      <p className="dob"> {dob} </p>
    </div>
  );
};

export default Contact;
