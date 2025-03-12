import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'
import google from'../assets/google.svg'
export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (email === 'toto@gmail.com' && password === 'toto') {
      alert('Connexion réussie !');
      navigate('/dashboard');
    } else {
      alert('Identifiants invalides.');
    }
  };

  const handleGoogleSignIn = () => {
    alert('Connexion avec Google en cours...');
    navigate('/dashboard'); 
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full h-full items-center justify-center lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white py-5 px-15 rounded-3xl border-2 border-gray-200"
        >
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg mt-4 mb-4 text-gray-500">
            Welcome back! Please enter your details
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                className="w-full p-3 mt-1 rounded-xl border-2 border-gray-200"
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium">Mot de passe</label>
              <input
                className="w-full p-3 mt-1 rounded-xl border-2 border-gray-200"
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col space-y-3">
            <button
              type="submit"
              className="bg-custom-purple p-3 rounded-lg text-xl font-bold text-white"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className=" inline-flex space-x-2 p-3 border border-gray-300 rounded-lg text-lg items-center justify-center">
                <img className='w-6 h-6' src={google} alt="" />
                <p>Sign in with Google</p>
            </button>
          </div>
        </form>
      </div>
      <div className="relative hidden lg:flex h-full w-1/2 bg-gray-200 items-center justify-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
}
