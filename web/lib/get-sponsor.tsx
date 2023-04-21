export {}

// import { GetServerSideProps } from "next";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "pages/api/auth/[...nextauth]";

// export const getSponsor: GetServerSideProps = async (context) => {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   if (!session) {
//     return {
//       props: { sponsor: "unknown" },
//     };
//   }

//   const sponsorsResponse = await fetch(
//     "https://raw.githubusercontent.com/pomber/code-hike-site/main/data/sponsors.json"
//   );
//   const sponsorsData = await sponsorsResponse.json();

//   const { user, orgs } = session;
//   const login = user.name;
//   const allAccess = [...sponsorsData.sponsors, ...sponsorsData.access];

//   let isSponsor = false;
//   if (allAccess.some((s) => s.login === login)) {
//     isSponsor = true;
//   }

//   // org has access
//   const userOrgs = orgs || [];
//   if (allAccess.some((s) => s.isOrg && userOrgs.includes(s.login))) {
//     isSponsor = true;
//   }

//   return {
//     props: {
//       // sponsor: { user, orgs },
//       sponsor: isSponsor ? "sponsor" : "not-sponsor",
//     },
//   };
// };
