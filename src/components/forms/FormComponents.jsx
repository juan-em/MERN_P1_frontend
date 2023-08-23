import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const NewUserFormHeader = ({ title }) => {
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

export const EditUserFormHeader = ({ title, onSaveUser, onDeleteUser }) => {
  return (
    <div className="form__title-row">
      <h2>{title}</h2>
      <div className="form__action-buttons">
        <button className="icon-button" title="Save" onClick={onSaveUser}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="icon-button" title="Delete" onClick={onDeleteUser}>
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
        {label} <span className="nowrap">{description}</span>
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

export const SelectOptions = (objectOptions) =>
  Object.values(objectOptions).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

export const CheckBoxField = ({ inputObject, errors }) => {
  const { label, name, type, description, register } = inputObject;
  const isValid = !errors[name]?.message && true;

  return (
    <>
      <label
        className="form__label form__checkbox-container"
        htmlFor="user-active"
      >
        {label} {description && <span className="nowrap">{description}</span>}
        <input
          className="form__checkbox"
          id={name}
          name={name}
          type={type}
          {...register}
        />
      </label>
      {!isValid && <p className="error">{errors[name]?.message}</p>}
    </>
  );
};
