import { useGetUsersQuery } from "../../app/api/users/usersApiSlice";
import { Error } from "../../components/errors/Error";
import UsersTable from "../../components/tables/users/UsersTable";

const UsersListPage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000, // Perform a new query every 60 seconds to keep the data updated.
    refetchOnFocus: true, // Perform a new query when the user refocuses on the page.
    refetchOnMountOrArgChange: true, // Perform a new query when the component is remounted or when query arguments change.
  });


  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <Error error={error} />; //-----> option 1
  if (isSuccess) content = <UsersTable ids={users.ids} />;

  return content;
};

export default UsersListPage;
