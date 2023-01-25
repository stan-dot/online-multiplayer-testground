
import { ReactNode } from 'react'


type FormWrapperProps = {
  title: string,
  children: ReactNode
}

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className='text-center m-0 mb-2' >{title}</h2>
      <div className='grid gap-1 justify-start grid-cols-2'>{children}</div>
    </>
  )
}
