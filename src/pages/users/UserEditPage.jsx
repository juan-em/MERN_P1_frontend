import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../app/api/users/usersApiSlice";
import { selectUserById } from "../../app/api/users/usersApiSelectors";
import EditUserForm from "../../components/forms/users/EditUserForm";

const UserEditPage = () => {
  const [
    updateUser,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();
  const { id } = useParams();
  const userSelected = useSelector((state) => selectUserById(state, id))
  const form = useForm({defaultValues: userSelected})

  const onSaveUser = async (data) => {
    data.id = id;
    if (!data?.password) {
      delete data.password;
    }
    await updateUser(data);
  };

  const onDeleteUser = async () => {
    await deleteUser({ id });
  };

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      const msg = isUpdateSuccess ? "User updated" : "User Deleted";
      window.alert(msg);
      navigate("/dash/users");
    }
  }, [isUpdateSuccess, isDeleteSuccess]);


  useEffect(() => {
    if (userSelected) form.reset(userSelected)
  }, [userSelected])


  return (
    <>
      {userSelected ? (
        <>
          {isUpdateError && <p>{updateError?.data?.message}</p>}
          {isDeleteError && <p>{deleteError?.data?.message}</p>}
          <EditUserForm
            form={form}
            onSaveUser={onSaveUser}
            onDeleteUser={onDeleteUser}
          />
          {isUpdateLoading && <p>Updating...</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default UserEditPage;
