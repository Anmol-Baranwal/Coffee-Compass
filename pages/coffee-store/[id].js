import { useRouter } from "next/router";
import Link from "next/link";

const coffeeStore = () => {
  const router = useRouter();
  return <div>Coffee Page nested routing {router.query.id}</div>;
  <Link href="/">
    <a>Go to home page</a>
  </Link>; // it doesnt refresh the page like <a> tag
};

export default coffeeStore;
