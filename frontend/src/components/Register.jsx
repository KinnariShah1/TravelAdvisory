// import { useRef, useState } from "react";
// import "./register.css";
// import axios from "axios";
// import { Cancel } from "@material-ui/icons";

// const Register = ({setShowRegister}) => {
//   const [success, setSuccess] = useState(false)
//   const [error, setError] = useState(false)
//   const nameRef = useRef()
//   const emailRef = useRef()
//   const passwordRef = useRef()
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newUser = {
//       username:nameRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };

//     try {
//       await axios.post("/users/register",newUser);
//       setError(false);
//       setSuccess(true);
//     } catch (error) {
//       setError(true)
//     }
//   }

//   return (
//     <div className="registerContainer">
//         <div className="logo">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8-XmtYhKzbUz_JeXP1LCM8ytakRhtqxbIA&usqp=CAU" alt="TravelPin" style={{ width: '50px', height: '50px' }}/>
//           <b>TravelPin</b>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="username" ref={nameRef}></input>
//           <input type="email" placeholder="email" ref={emailRef}></input>
//           <input type="password" placeholder="password" ref={passwordRef}></input>
//           <button className="registerBtn">Register</button>
//           {success && (
//             <span className="success">Successfull. You can login now!</span>
//           )}
//           {error && (
//             <span className="failure">Something went wrong!</span>
//           )}
//         </form>
//         <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
//     </div>
//   )
// }

// export default Register



import { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { Cancel } from "@material-ui/icons";

const Register = ({ setShowRegister, setLoggedIn }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser); // Adjusted URL
      setError(false);
      setSuccess(true);
      setLoggedIn(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8-XmtYhKzbUz_JeXP1LCM8ytakRhtqxbIA&usqp=CAU"
          alt="TravelPin"
          style={{ width: "50px", height: "50px" }}
        />
        <b>TravelAdvisor</b>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} className="username"></input>
        <input type="email" placeholder="email" ref={emailRef} className="email"></input>
        <input type="password" placeholder="password" ref={passwordRef} className="password"></input>
        <button type="submit" className="registerBtn">Register</button>
        {success && (
          <span className="success">Successfully registered. You can login now!</span>
        )}
        {/* {error && <span className="failure">Something went wrong!</span>} */}
      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
    </div>
  );
};

export default Register;
