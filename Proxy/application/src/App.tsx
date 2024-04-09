import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ChippedLists } from "any3-ui-components/src/Base/Components/ChippedMultiSelect"
import PathNavigation from "any3-ui-components/src/Base/Components/PathNavigation/PathNavigation"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <PathNavigation teamSelector />
        <ChippedLists 
          value={[
            {
              label: "Group 1", chips: [
                {label: "CH 1 1", value: 11}, 
                {label: "CH 1 2", value: 12}
              ]
            }, {
              label: "Group 2", chips: [
                {label: "CH 2 1", value: 21},
                 {label: "CH 2 2", value: 22}, 
                 {label: "CH 2 3", value: 23}
                ]
              }
            ]} 
          itemGroupMapping={{
            optionGroupLabel: "label",
            optionGroupChildren: "chips",
            optionLabel: "label",
            optionValue: "value"
          }}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
