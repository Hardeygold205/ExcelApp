// import React from "react";
// import { View, StyleSheet } from "react-native";

// const CustomPageIndicator = ({ numberOfPages, currentPage }) => {
//   return (
//     <View style={styles.container}>
//       {Array.from({ length: numberOfPages }).map((_, index) => (
//         <View
//           key={index}
//           style={[
//             styles.indicator,
//             index === currentPage
//               ? styles.activeIndicator
//               : styles.inactiveIndicator,
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   indicator: {
//     height: 4,
//     flex: 1,
//     marginHorizontal: 2,
//   },
//   activeIndicator: {
//     backgroundColor: "#1e77fb",
//   },
//   inactiveIndicator: {
//     backgroundColor: "#e0e0e0",
//   },
// });

// export default CustomPageIndicator;
