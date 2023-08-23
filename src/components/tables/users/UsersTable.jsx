import UsersTableRow from "./UsersTableRow";

const UsersTableHeader = () => {
  return (
    <thead className="table__thead">
      <tr>
        <th scope="col" className="table__th user__username">
          Username
        </th>
        <th scope="col" className="table__th user__roles">
          Roles
        </th>
        <th scope="col" className="table__th user__edit">
          Edit
        </th>
      </tr>
    </thead>
  );
};

const UsersTableBody = ({ ids }) => {
  return (
    <tbody>
      {ids?.length &&
        ids.map((userId) => <UsersTableRow key={userId} userId={userId} />)}
    </tbody>
  );
};

const UsersTable = ({ ids }) => {
  return (
    <table className="table table--users">
      <UsersTableHeader />
      <UsersTableBody ids={ids} />
    </table>
  );
};

export default UsersTable;
