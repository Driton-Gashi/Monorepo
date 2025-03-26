"use client"
import { useState } from 'react';
import { useBearImages } from '@/app/hooks/useBearImages';
import { useBearAnimation } from '@/app/hooks/useBearAnimation';
import BearAvatar from './BearAvatar';
import Input from '../global/Input';
import Image from 'next/image';
import { toast } from 'sonner';
import { apiHandler } from '@/app/utils/helpfulFunctions';
import { useUser } from '@/app/context/UserContext';
import { redirect } from 'next/navigation';

const EyeIconSrc = '/assets/icons/eye_on.svg';
const EyeOffIconSrc = '/assets/icons/eye_off.svg';

export default function LoginForm() {
  // Animation Logic
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { watchBearImages, hideBearImages, peakBearImages } = useBearImages();
  const {
    currentBearImage,
    setCurrentFocus,
    currentFocus,
    isAnimating,
  } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    peakBearImages,
    emailLength: values.email.length,
    showPassword,
  });

  const togglePassword = () => {
    if (!isAnimating) {
      setShowPassword((prev) => !prev);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { setLoggedInUserData } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if(values.email.length == 0){
        toast.error("Email is Empty!")
        return;
      }
  
      if(!values.email.includes("@")){
        toast.error("Email should contain a \"@\"!")
        return;
      }
      
      if(values.password.length == 0){
        toast.error("Password is Empty!")
        return;
      }
   
  
    const response = await fetch(apiHandler("/api/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  
    const result = await response.json();

    if (response.ok) {
      setLoggedInUserData({
        ...result.userData
      })
      toast.success(result.message)
      setTimeout(()=> redirect("/dashboard"),1500)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-[130px] h-[130px] relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {currentBearImage && (
            <BearAvatar
              currentImage={currentBearImage}
              key={`${currentFocus}-${values.email.length}`}
            />
          )}
        </div>
      </div>
      <Input
        placeholder="Email"
        name="email"
        type="email"
        autoFocus
        onFocus={() => setCurrentFocus('EMAIL')}
        autoComplete="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <div className="w-full relative">
        <Input
          placeholder="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          onFocus={() => setCurrentFocus('PASSWORD')}
          autoComplete="current-password"
          value={values.password}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute right-3 top-1/2 -translate-y-1/2
           text-gray-500 focus:outline-none transition-all duration-300
           hover:text-gray-700`}
        >
          {showPassword ? (
            <Image
              src={EyeOffIconSrc}
              alt="Hide password"
              width={20}
              height={20}
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          ) : (
            <Image
              src={EyeIconSrc}
              alt="Show password"
              width={20}
              height={20}
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          )}
        </button>
      </div>
      <button
        type="submit"
        className="text-primary-white py-4 w-full rounded-lg bg-primary-red font-semibold text-lg focus:outline-primary-red outline-offset-2"
      >
        Log In
      </button>
    </form>
  );
}