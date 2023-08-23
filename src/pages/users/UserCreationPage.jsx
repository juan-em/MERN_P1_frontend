import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "../../app/api/users/usersApiSlice";
import NewUserForm from "../../components/forms/users/NewUserForm";

const UserCreationPage = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();
  const navigate = useNavigate()
  const form = useForm();

  const onSaveUserClicked = async (data) => {
    await addNewUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.alert("User saved");
      const { reset } = form;
      reset();
      navigate('/dash/users')
    }
  }, [isSuccess]);

  return (
    <>
      {isError && <p className="errmsg">{error?.data?.message}</p>}
      <NewUserForm form={form} onSubmit={onSaveUserClicked} />
      {isLoading && <p>Saving...</p>}
    </>
  );
};

export default UserCreationPage;
