"use client";

type FormWrapperProps = {
  title?: string;
  body?: React.ReactElement;
};

export const FormWrapper = ({ title, body }: FormWrapperProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
      <div>{body}</div>
    </div>
  );
};
