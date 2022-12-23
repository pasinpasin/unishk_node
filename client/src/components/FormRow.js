function FormRow({type,name,value,handleChange,labelText}) {
  return (
    <div class="mb-6">
        <label htmlFor={name} className="form-label">
        { labelText || name}
        </label>
    <input 
    
      type={type} name={name}  onChange={handleChange}
      class=" input input-bordered input-primary form-control block w-full px-4 py-2 text-xl"
     value= {value}
     
    />
  </div>
  )
}

export default FormRow
