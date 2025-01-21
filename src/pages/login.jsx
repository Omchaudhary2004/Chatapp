// import React, { useState } from "react";
// import { CometChat } from "@cometchat/chat-sdk-javascript";

// const APP_ID = "26958474e3afb819"; // Replace with your CometChat App ID
// const REGION = "in"; // Replace with your region
// const AUTH_KEY = "64af977a4dd3176ebdd85c11264a9c4c463c6143"; // Replace with your Auth Key

// const Login = () => {
//   const [uid, setUid] = useState("");
//   const [name, setName] = useState("");
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Initialize CometChat
//   React.useEffect(() => {
//     CometChat.init(APP_ID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(REGION).build())
//       .then(() => console.log("CometChat initialized successfully"))
//       .catch((error) => console.error("CometChat initialization failed", error));
//   }, []);

//   // Create User
//   const handleCreateUser = () => {
//     if (!uid || !name) {
//       alert("Please provide both User ID and Name.");
//       return;
//     }

//     const user = new CometChat.User(uid);
//     user.setName(name);

//     CometChat.createUser(user, AUTH_KEY)
//       .then(() => {
//         alert("User created successfully!");
//         setUid("");
//         setName("");
//       })
//       .catch((error) => console.error("Error creating user:", error));
//   };

//   // Login
//   const handleLogin = () => {
//     if (!uid) {
//       alert("Please provide a User ID.");
//       return;
//     }

//     CometChat.login(uid, AUTH_KEY)
//       .then((user) => {
//         console.log("Login successful:", user);
//         setLoggedInUser(user);
//         alert(`Welcome ${user.name}!`);
//       })
//       .catch((error) => console.error("Login failed:", error));
//   };

//   // Logout
//   const handleLogout = () => {
//     CometChat.logout()
//       .then(() => {
//         alert("Logged out successfully!");
//         setLoggedInUser(null);
//         setUid("");
//         setName("");
//       })
//       .catch((error) => console.error("Logout failed:", error));
//   };

//   return (
//     <div style={styles.container}>
//       <h2>CometChat Login</h2>
//       {loggedInUser ? (
//         <div style={styles.welcome}>
//           <h3>Welcome, {loggedInUser.name}!</h3>
//           <button style={styles.button} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <input
//             type="text"
//             placeholder="User ID"
//             value={uid}
//             onChange={(e) => setUid(e.target.value)}
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Name (For User Creation)"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={styles.input}
//           />
//           <button style={styles.button} onClick={handleCreateUser}>
//             Create User
//           </button>
//           <button style={styles.button} onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "auto",
//     padding: "20px",
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     margin: "10px 0",
//   },
//   welcome: {
//     textAlign: "center",
//   },
// };

// export default Login;
