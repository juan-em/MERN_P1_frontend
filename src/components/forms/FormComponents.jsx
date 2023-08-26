import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";


export const NewFormHeader = ({ title }) => {
  return (
    <div className="form__title-row">
      <h2>{title}</h2>
      <div className="form__action-buttons">
        <button className="icon-button" type="submit" title="Save">
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
    </div>
  );
};

export const EditFormHeader = ({ title, onSave, onDelete }) => {
  return (
    <div className="form__title-row">
      <h2>{title}</h2>
      <div className="form__action-buttons">
        <button className="icon-button" title="Save" onClick={onSave}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="icon-button" title="Delete" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export const TextField = ({ inputObject, errors }) => {
  const { label, name, type, description, register } = inputObject;
  const isValid = !errors[name]?.message && true;
  const validClass = isValid ? "" : "form__input--incomplete";

  return (
    <>
      <label className="form__label" htmlFor={name}>
        {label} {description && <span className="nowrap">{description}</span>}
      </label>
      <input
        className={`form__input ${validClass}`}
        type={type}
        autoComplete="off"
        id={name}
        {...register}
      />
      {!isValid && <p className="error">{errors[name]?.message}</p>}
    </>
  );
};

export const SelectField = ({ selectObject, options, errors }) => {
  const {
    label,
    name,
    multiple = false,
    size = 3,
    description,
    register,
  } = selectObject;
  const isValid = !errors[name]?.message && true;
  const validClass = isValid ? "" : "form__input--incomplete";

  return (
    <>
      <label className="form__label" htmlFor={name}>
        {label} {description && <span className="nowrap">{description}</span>}
      </label>
      <select
        id={name}
        name={name}
        className={`form__select ${validClass}`}
        multiple={multiple}
        size={size}
        {...register}
      >
        {options}
      </select>
      {!isValid && <p className="error">{errors[name]?.message}</p>}
    </>
  );
};

export const SelectRolesOptions = (objectOptions) =>
  Object.values(objectOptions).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

export const SelectUsersOptions = (objectOptions) =>
  Object.values(objectOptions).map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

export const CheckBoxField = ({ inputObject, errors }) => {
  const { label, name, type, description, register } = inputObject;
  const isValid = !errors[name]?.message && true;

  return (
    <>
      <label className="form__label form__checkbox-container" htmlFor={name}>
        {label} {description && <span className="nowrap">{description}</span>}
        <input
          className="form__checkbox"
          id={name}
          name={name}
          type="checkbox"
          {...register}
        />
      </label>
      {!isValid && <p className="error">{errors[name]?.message}</p>}
    </>
  );
};
