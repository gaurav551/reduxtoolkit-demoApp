import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
export const SimpleForm = () => {
    const imageValidationSchema = yup.object().shape({
        attachment: yup.mixed()
          .required("You need to provide a file")
          .test("fileSize", "File Size is too large", (value) => {
            console.log(value[0].size);
            return value[0].size <= 1000000;
          })
        
      });
    const { register, handleSubmit,formState } = useForm({resolver: yupResolver(imageValidationSchema)});
    const { errors } = formState;

    const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input maxLength={4} {...register("firstName")} />
    <input type='file' {...register("attachment")}/>
    {errors.attachment && <p>{errors.attachment.message}</p>}
    <select {...register("gender")}>
    
      <option value="female">female</option>
      <option value="male">male</option>
      <option value="other">other</option>
    </select>
    <input type="submit" />
  </form>
  )
}
