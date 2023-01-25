import FormWrapper from "./FormWrapper";

export default function AccountForm() {
  return (
    <FormWrapper title="Account form">
      <label htmlFor="">Email</label>
      <input type="text" className="email border-solid border-1" required autoFocus />
      <label htmlFor="">Password</label>
      <input type="text" className="email border-solid border-1" required />
    </FormWrapper>
  )
}
