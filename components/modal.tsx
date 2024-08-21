"use client";

import { Input } from "@/components/ui/input";

export const modal = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form>
        <div className="relative mb-6">
          <Input
            type="text"
            id="name"
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="absolute left-0 -top-6 text-gray-500 transition-all transform scale-75 -translate-y-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
        </div>
        <div className="relative mb-6">
          <Input
            type="email"
            id="email"
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-6 text-gray-500 transition-all transform scale-75 -translate-y-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
        </div>
        <div className="relative mb-6">
          <Input
            type="password"
            id="password"
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute left-0 -top-6 text-gray-500 transition-all transform scale-75 -translate-y-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};
