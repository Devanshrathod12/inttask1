import React from 'react'
import Formdata from './component/formdata/formdata'
import Tabaldata from './component/Tabaldata/Tabaldata'
const App = () => {
  return (
    <>
    <div className=' ml-16  mt-4 rounded-lg'>
      <Formdata /> 
      
    </div>
    <div>
    <Tabaldata/>
    </div>
    </>
  )
}

export default App
