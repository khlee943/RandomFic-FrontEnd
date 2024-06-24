// import React, { useState } from "react";
// import { IoMdHome } from 'react-icons/io';
// import { RiEditBoxLine } from 'react-icons/ri';
// import { useRouter } from 'next/router'; // Import useRouter hook from Next.js
//
// function DropdownMenu() {
//   const [isActive, setIsActive] = useState(false);
//   const router = useRouter(); // Initialize useRouter hook
//
//   const toggleMenu = () => {
//     setIsActive(!isActive);
//   };
//
//   // Function to handle navigation when a button is clicked
//   const handleNavigation = (path) => {
//     router.push(path); // Use router.push() to navigate programmatically
//     setIsActive(false); // Close the dropdown menu after navigation
//   };
//
//   return (
//     <div className={`navigation${isActive ? " active" : ""}`}>
//       <div className="menuToggle" onClick={toggleMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <ul className="menu">
//         <li onClick={() => handleNavigation('/')}>
//           <button>
//             <IoMdHome /> Home
//           </button>
//         </li>
//         <li onClick={() => handleNavigation('/recommend')}>
//           <button>
//             <RiEditBoxLine /> Recommend Fanfic
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }
//
// export default DropdownMenu;
//
//
//
//
// // import React, { useState } from "react";
// // import { IoMdHome } from 'react-icons/io';
// // import { RiEditBoxLine } from 'react-icons/ri';
// //
// // function DropdownMenu() {
// //   const [isActive, setIsActive] = useState(false);
// //
// //   const handleClick = () => {
// //     setIsActive(!isActive);
// //   };
// //
// //   return (
// //     <div className={`navigation${isActive ? " active" : ""}`}>
// //       <div className="menuToggle" onClick={handleClick}>
// //         <span></span>
// //         <span></span>
// //         <span></span>
// //       </div>
// //       <ul className="menu">
// //         <li>
// //           <a href="/">
// //             <IoMdHome /> Home
// //           </a>
// //         </li>
// //         <li>
// //           <a href="/recommend">
// //             <RiEditBoxLine /> Recommend Fanfic
// //           </a>
// //         </li>
// //       </ul>
// //     </div>
// //   );
// // }
// //
// // export default DropdownMenu;
