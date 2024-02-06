
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
         <div className="flex justify-center items-center h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form className="space-y-4">
                   
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 p-3 w-full border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required className="mt-1 p-3 w-full border-gray-300 rounded-md" />
                    </div>
                   
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Register</button>
                    </div>
                    <Link to="/" className="text-blue-500 hover:underline">Don't have an account?Sign up</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login