import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { signIn } from '../lib/auth'
import { useState } from 'react'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const onSubmit = async ({ email, password }) => {
        setIsLoading(true)
        setError(null)
        try {
            await signIn(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.message || 'Failed to sign in. Please check your credentials.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to access your account</p>
            </div>
    
            <div className="bg-white rounded-lg shadow-md p-8">
                {
                    error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                        </div>
                )}
    
                <form onSubmit= {handleSubmit(onSubmit)}>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="your@email.com"
                        {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Enter a valid email',
                        },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
        
                    <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 text-sm font-semibold" htmlFor="password">
                        Password
                        </label>
                        {/* <Link to="/forgot-password" className="text-sm text-orange-600 hover:text-orange-800">
                        Forgot password?
                        </Link> */}
                    </div>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="••••••••"
                        {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
        
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 cursor-pointer"
                        disabled={isLoading}
                        >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
    
                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-orange-600 hover:text-orange-800 font-semibold">
                        Sign up
                    </Link>
                    </p>
                </div>
            </div>
          </div>
        </div>
      )
    }


export default SignIn
  
