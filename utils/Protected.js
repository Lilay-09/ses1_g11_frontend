import { useRouter } from "next/router";
import { useEffect } from "react"; // Custom authentication utility function
import { isUserAuthenticated } from "./isUserAuthenicated";

const Protected = (WrappedComponent) => {
  const WithAuthentication = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isUserAuthenticated()) {
        router.replace("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default Protected;
