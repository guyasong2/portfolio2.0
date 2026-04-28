import { login } from './actions'
import { FaLock, FaEnvelope } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md bg-base-100/60 backdrop-blur-xl shadow-2xl border border-base-100/20 rounded-3xl p-8 sm:p-10">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-base-content/70 text-sm">Sign in to access your dashboard</p>
        </div>

        <form action={login} className="space-y-6">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text font-semibold text-base-content/80">Email</span>
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-base-content/40 w-4 h-4" />
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="admin@guyasong.me" 
                className="input input-bordered w-full pl-11 bg-base-100/50 focus:bg-base-100 transition-colors" 
                required 
              />
            </div>
          </div>
          
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text font-semibold text-base-content/80">Password</span>
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-base-content/40 w-4 h-4" />
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                className="input input-bordered w-full pl-11 bg-base-100/50 focus:bg-base-100 transition-colors" 
                required 
              />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all font-bold tracking-wide">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
