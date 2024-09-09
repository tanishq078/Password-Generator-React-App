import { useCallback, useEffect, useState, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharALlowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"

    if (charAllowed) str += "!@#$%^&*()_+=-[]{}~`"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 21)
    window.navigator.clipboard.writeText(password);

  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  // passwordGenerator()

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-5 my-10 text-orange-500 bg-gray-900'>
        <h1 className='text-white text-center text-2xl font-semibold mb-5'>Password Generator</h1>

        <div className='flex shadow-md rounded-lg overflow-hidden mb-6'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-4 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
            placeholder='Generated Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-600 hover:bg-blue-500 transition-all text-white px-4 py-2 shrink-0 font-medium'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-col justify-center items-center text-sm gap-x-4 mb-4'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer accent-orange-500 w-full'
              onChange={(e) => { setLength(e.target.value) }}
            />
          </div>
          <label className='text-gray-200 font-medium mt-2'>Length: {length}</label>
        </div>

        <div className='flex justify-between gap-4'>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              className='accent-orange-500 cursor-pointer'
            />
            <label htmlFor="numberInput" className='text-gray-200 font-medium'>Include Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharALlowed((prev) => !prev)
              }}
              className='accent-orange-500 cursor-pointer'
            />
            <label htmlFor="characterInput" className='text-gray-200 font-medium'>Include Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
