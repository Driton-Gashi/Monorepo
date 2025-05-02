"use client"
import { useState } from "react";
import { toast } from "sonner";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import { redirect } from "next/navigation";
import Input from "../global/Input";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

const RegisterForm = () => {

  const [showThumbUpBear, setShowThumbUpBear] = useState<boolean>(false);
  const [showCryingBear, setShowCryingBear] = useState<boolean>(false);
      
    const [values, setValues] = useState({
      name: "",
      lastname: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        if(values.name.length == 0){
          toast.error("Name is Empty!")
          setShowCryingBear(true);
          return;
        }
    
        if(values.lastname.length == 0){
          toast.error("Lastname is Empty!")
          setShowCryingBear(true);
          return;
        }
    
        if(values.email.length == 0){
          toast.error("Email is Empty!")
          setShowCryingBear(true);
          return;
        }
  
        if(!values.email.includes("@")){
          toast.error("Email should contain a \"@\"!")
          setShowCryingBear(true);
          return;
        }
        
        if(values.password.length == 0){
          toast.error("Password is Empty!")
          setShowCryingBear(true);
          return;
        }
     
    
      const response = await fetch(apiHandler("/api/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    
      const result = await response.json();
  
      if (response.ok) {
        toast.success(result.message)
        setShowThumbUpBear(true);
      setTimeout(() => {
        redirect("/dashboard");
        setShowThumbUpBear(false);
      }, 2000);
        setTimeout(()=> redirect("/dashboard"),1500)
      } else {
        toast.error(result.message)
        setShowCryingBear(true);
      }
    }

  return (
    <form autoComplete={"off"} onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-stretch">
        <div className="flex items-center justify-center">
          {
            showThumbUpBear ? <Image
            src="/assets/img/bear/bear_red/thumb_up_bear.png"
            className="transition-all duration-200 ease-in-out"
            width={130}
            height={130}
            style={{
              objectFit: "contain",
              transform: "translate3d(0,0,0)",
            }}
            tabIndex={-1}
            alt="Animated bear avatar"
          />: showCryingBear ? (
            <Image
              src="/assets/img/bear/bear_red/crying_bear.png"
              className="transition-all duration-200 ease-in-out"
              width={130}
              height={130}
              style={{
                objectFit: "contain",
                transform: "translate3d(0,0,0)",
              }}
              tabIndex={-1}
              alt="Animated bear avatar"
              priority
            />
          ): <Image height={130} width={130} src="/assets/img/watch_bear_red/watch_bear_0.png" alt=""/>
          }
          
        </div>
            <div className="flex gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={handleChange}
                  onFocus={()=> setShowCryingBear(false)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Your last name"
                  value={values.lastname}
                  onChange={handleChange}
                  onFocus={()=> setShowCryingBear(false)}
                />
              </div>
            </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onFocus={()=> setShowCryingBear(false)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onFocus={()=> setShowCryingBear(false)}
            />
          </div>
          <button
        type="submit"
        className="text-primary-white py-4 w-full rounded-lg bg-primary-red font-semibold text-lg focus:outline-primary-red outline-offset-2"
      >
        Register
      </button>
        </form>
  )
}

export default RegisterForm