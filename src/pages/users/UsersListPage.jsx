import { useGetUsersQuery } from "../../app/api/users/usersApiSlice";
import Error from "../../components/errors/error";
import UsersTable from "../../components/tables/users/UsersTable";

const UsersListPage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <Error error={error} />
  if (isSuccess) content= <UsersTable ids={users.ids}/>

  return content
};

export default UsersListPage;
