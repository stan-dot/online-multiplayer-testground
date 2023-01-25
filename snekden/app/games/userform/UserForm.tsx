import FormWrapper from "./FormWrapper";

type UserData = {
  firstName: string;
  lastName: string;
  age: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export default function UserForm(
  { firstName, lastName, age, updateFields }: UserFormProps,
) {
  // todo the same for other fields - now it has data persistence
  return (
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input
        type="text"
        className="text"
        autoFocus
        required
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input type="text" className="text" required value={lastName} />
      <label>Age</label>
      <input type="number" className="number" required min={1} value={age} />
    </FormWrapper>
  );
}
