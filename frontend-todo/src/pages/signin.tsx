 import React from 'react';
import PopupBox from '../Poup';
// import '../../styles/index.css'

 interface SignInInterface {

 }
 const SignIn: React.FC<SignInInterface> = ({}) => {
    return (
        <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
         
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                name="email"
                value=""
                onChange={() => {}}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value=""
                onChange={() => {}}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              onClick={()=>{}}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Sign In
            </button>
     
          <div className="mt-4 text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              SignUp
            </a>
          </div>
        </div>
      </div>
      <PopupBox
        isOpen={false}
        isSuccess={true}
        message={
          "messagemessagemessagemessagemessagemessagemessageme ssagemessage messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemes sagemessagemessagemessagemessagemessagemessagemessagemes sagemessagemessagemessagemessagemessagemessagemessagemessage"
        }
        onClose={() => {}}
      />
    </>
    )

}

export default SignIn;