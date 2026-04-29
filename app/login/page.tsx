import { login } from './actions'
import { FaLock, FaEnvelope } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-8">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black uppercase tracking-[-0.03em]">Sign In</h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]">Dashboard Access</p>
        </div>

        <form action={login} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] block" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 w-3.5 h-3.5 opacity-50" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@email.com"
                className="w-full h-14 bg-black border-2 border-white pl-12 pr-6 text-sm font-bold placeholder:opacity-30 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] block" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 w-3.5 h-3.5 opacity-50" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-14 bg-black border-2 border-white pl-12 pr-6 text-sm font-bold focus:outline-none"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black hover:text-white hover:border-2 hover:border-white border-2 border-white transition-all">
            Authenticate →
          </button>
        </form>
      </div>
    </div>
  )
}
