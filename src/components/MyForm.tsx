import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form"

type FormValues = {
  username: string
  email: string
  channel: string
}
const checkInteger = /^[A-Za-z]+$/;
const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkChar = /^\d+$/;

const Myform = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  }
  return (
    <div className='w-1/2 mx-auto mt-2 py-5 flex flex-col items-center justify-center bg-[#effffc] rounded-md'>
      <h1 className="font-bold text-2xl">MyForm Validation  </h1> <br />
      <h1 className="font-bold text-2xl">Using React-Hook-Form </h1> <br />
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username", {
          required: { value: true, message: "username is required!" },
          validate: (fieldValue) => {
            const regex = checkInteger; // This regex only allows alphabetic characters.
            if (!regex.test(fieldValue)) {
              return "enter only characters (no numbers or special characters).";
            }
            return true;
          }
        })} />
        <p className="text-red-700">{errors.username?.message}</p>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email", {
          pattern: {
            value: checkEmail,
            message: "invalid email address"
          },
          validate: (fieldValue) => {
            return (
              fieldValue !== "admin@example.com" || "enter a different email"
            );
          },
          required: { value: true, message: "email is required!" },

        })} />
        <p className="text-red-700">{errors.email?.message}</p>
        <label htmlFor="channel">Channel ID</label>
        <input type="text" id="channel" {...register("channel", {
          required: {
            value: true,
            message: "required this field!",
          },
          pattern:{
            value: checkChar,
            message:"enter only number"
          }
        })} /><p className="text-red-700">{errors.channel?.message}</p> <br />

        <button className="bg-[#191434]" type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default Myform
