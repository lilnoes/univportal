export default function Home() {
  return <div></div>;
}

export async function getServerSideProps({ context }) {
  return { redirect: { destination: "/account/login", permanent: false } };
}
