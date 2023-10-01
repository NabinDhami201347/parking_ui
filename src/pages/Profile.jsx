import { useQuery } from "@tanstack/react-query";

import { privateAxios } from "../api";
import Loading from "../components/Loading";

const Profile = () => {
  const fetchProfile = async () => {
    try {
      const res = await privateAxios.get("/auth/me");
      return res.data.user;
    } catch (error) {
      console.log("error while fetching profile", error);
    }
  };

  const { data: user, isLoading, isError, error } = useQuery(["profile"], fetchProfile);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(user);
  return <div>{user.name}</div>;
};

export default Profile;
