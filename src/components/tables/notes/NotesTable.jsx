import NotesTableRow from "./NotesTableRow";

const NotesTableHeader = () => {
  return (
    <thead className="table__thead">
      <tr>
        <th scope="col" className="table__th note__status">
          Username
        </th>
        <th scope="col" className="table__th note__created">
          Created
        </th>
        <th scope="col" className="table__th note__updated">
          Updated
        </th>
        <th scope="col" className="table__th note__title">
          Title
        </th>
        <th scope="col" className="table__th note__username">
          Owner
        </th>
        <th scope="col" className="table__th note__edit">
          Edit
        </th>
      </tr>
    </thead>
  );
};

const NotesTableBody = ({ ids }) => {
  return (
    <tbody>
      {ids?.length &&
        ids.map((noteId) => <NotesTableRow key={noteId} noteId={noteId} />)}
    </tbody>
  );
};

const NotesTable = ({ ids }) => {
  return (
    <table className="table table--notes">
      <NotesTableHeader />
      <NotesTableBody ids={ids} />
    </table>
  );
};

export default NotesTable;
