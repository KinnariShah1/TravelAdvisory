// import { useRef, useState } from "react";
// import "./login.css";
// import axios from "axios";
// import { Cancel } from "@material-ui/icons";

// const Login = ({setShowLogin, myStorage, setCurrentUser}) => {
//   const [error, setError] = useState(false)
//   const nameRef = useRef()
//   const passwordRef = useRef()
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = {
//       username:nameRef.current.value,
//       password: passwordRef.current.value,
//     };

//     try {
//       const res = await axios.post("/users/login",user);
//       myStorage.setItem("user", res.data.username)
//       setCurrentUser(res.data.username)
//       setShowLogin(false)
//       setError(false);
//     } catch (error) {
//       setError(true)
//     }
//   }

//   return (
//     <div className="loginContainer">
//         <div className="logo">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8-XmtYhKzbUz_JeXP1LCM8ytakRhtqxbIA&usqp=CAU" alt="TravelPin" style={{ width: '50px', height: '50px' }}/>
//           <b>TravelPin</b>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="username" ref={nameRef}></input>
//           <input type="password" placeholder="password" ref={passwordRef}></input>
//           <button className="loginBtn">Login</button>

//           {error && (
//             <span className="failure">Something went wrong!</span>
//           )}
//         </form>
//         <Cancel className="loginCancel" onClick={() => setShowLogin(false)}/>
//     </div>
//   )
// }

// export default Login




// import { useRef, useState } from "react";
// import "./login.css";
// import axios from "axios";
// import { Cancel } from "@material-ui/icons";

// const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
//   const [error, setError] = useState(false);
//   const nameRef = useRef();
//   const passwordRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = {
//       username: nameRef.current.value,
//       password: passwordRef.current.value,
//     };

//     try {
//       const res = await axios.post("/users/login", user); // Adjusted URL
//       myStorage.setItem("user", res.data.username);
//       setCurrentUser(res.data.username);
//       setShowLogin(false);
//       setError(false);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <div className="logo">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8-XmtYhKzbUz_JeXP1LCM8ytakRhtqxbIA&usqp=CAU"
//           alt="TravelPin"
//           style={{ width: "50px", height: "50px" }}
//         />
//         <b>TravelAdvisor</b>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="username" ref={nameRef}></input>
//         <input type="password" placeholder="password" ref={passwordRef}></input>
//         <button className="loginBtn">Login</button>

//         {error && <span className="failure">Invalid username or password!</span>}
//       </form>
//       <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
//     </div>
//   );
// };

// export default Login;



import { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { Cancel } from "@material-ui/icons";
import { toast } from "react-toastify";

const Login = ({ setShowLogin, setLoggedIn }) => {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

const handleSubmit = async (e) => {
  e.preventDefault();
  const user = {
    username: nameRef.current.value,
    password: passwordRef.current.value,
  };

  try {
    const res = await axios.post("/users/login", user);
    // console.log("Login Response:", res);
    // console.log("User Data:", res.data);
    myStorage.setItem("user", res.data.user.username);
    // console.log('hi')
    setCurrentUser(res.data.user.username);
    // Assuming the token is returned in the response
    const token = res.data.token;
    console.log(token);
    // Store the token in local storage
    localStorage.setItem("token", token);
    // console.log('hello')
    // setLoggedIn(true);
    // console.log('after setLoggedIn');
    setShowLogin(false);
    // console.log('ShowLogin state:');
    setError(false);
    toast.success("Logged in successfully");
    window.location.reload();
    // console.log("Success")
  } catch (error) {
    console.error("Login Error:", error);
    setError(true);
  }
};


  return (
    <div className="loginContainer">
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8-XmtYhKzbUz_JeXP1LCM8ytakRhtqxbIA&usqp=CAU"
          alt="TravelPin"
          style={{ width: '50px', height: '50px' }}
        />
        <b>TravelAdvisor</b>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} className="username"></input>
        <input type="password" placeholder="password" ref={passwordRef} className="password"></input>
        <button type="submit" className="loginBtn">Login</button>

        {error && <span className="failure">Incorrect username or password</span>}
        {/* {!error && <span className="success">Incorrect username or password</span>} */}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;





