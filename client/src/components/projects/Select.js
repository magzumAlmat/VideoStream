import React from 'react'
import Select from 'react-select'

function CustomSelect({options,onChange,id}) {
  return (<div>
    
    <Select options={options} onChange={onChange} id="Category"/>
    </div>)
}


export default CustomSelect