// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import AuthContext from './context/AuthContext'; // Adjust the path as necessary

// const PrivateRoute = ({ children, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;