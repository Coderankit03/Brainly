
const InputBox = ({ placeholder,reference}: {placeholder: string; reference: any}) => {
  return (
    <div>
      <input ref={reference} placeholder={placeholder} type="text" className="px-6 border rounded py-3"></input>
    </div>
  )
}

export default InputBox
