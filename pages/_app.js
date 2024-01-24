import Layout from "../components/Layout/loginLayout";

// import Layout from "../components/Layout/loginLayout";

// export default function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }


export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
      <Component {...pageProps} />
  );
}

