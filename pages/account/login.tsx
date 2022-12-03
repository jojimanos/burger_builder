import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../../services';

import Image from 'next/image';

export default function Login() {
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ name, password }: {name: string, password: string}): Promise<void> {
    return userService.login(name, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl as unknown as URL || '/' as unknown as URL;
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <div>
      <div className='bg-stone-200 fixed w-full h-screen'>
      <h1 className='text-center p-2 text-3xl bg-amber-700'>Burger Builder App</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3'>
          <div className='hidden sm:grid sm:place-items-end'><Image alt='' src={"/cheeseBurger.png"} height={300} width={300}/></div>
        <div className="grid place-items-center text-center grid-row-7 py-3 px-8 gap-3">
          <form className='shadow-2xl shadow-black p-3 grid grid-row-3 py-3 gap-3' onSubmit={handleSubmit(onSubmit)}>
            <label className=' text-black font-bold'>Name</label>
            <input className='focus:shadow-md focus:shadow-teal-500' type="text" {...register('name')} />
            <div className='text-red-500'>{errors.name?.message}</div>
            <label className='text-black font-bold'>Password</label>
            <input className='focus:shadow-md focus:shadow-teal-500' type="password" {...register('password')} />
            <div className='text-red-500'>{errors.password?.message}</div>
            <div className='grid place-items-center'>
              <button className="border-2 border-black p-2 font-bold text-black" disabled={formState.isSubmitting}>Login</button>
            </div>
          </form>
        </div>
        <div className='grid place-items-center sm:grid sm:place-items-start'><Image alt='' src={"/cheeseBurger.png"} height={300} width={300}/></div>
        </div>
      </div>
    </div>
  )
}