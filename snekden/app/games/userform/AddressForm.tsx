import FormWrapper from "./FormWrapper"

export default function AddressForm() {
  return (
    <FormWrapper title="Address Form">

      <label htmlFor="">Street</label>
      <input type="text" className="text" required autoFocus />
      <label htmlFor="">City</label>
      <input type="text" className="text" required />
      <label htmlFor="">State</label>
      <input type="text" className="text" required />
      <label htmlFor="">Zip</label>
      <input type="text" className="text" required />
    </FormWrapper>
  )
}
