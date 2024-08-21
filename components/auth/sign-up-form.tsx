"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { insertUserSchema as baseInsertUserSchema } from "@/db/schema";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/queries/users/use-create-user";
import { useRouter } from "next/navigation";

const insertUserSchema = baseInsertUserSchema.extend({
  name: z.string().min(1, "É necessário informar um nome"),
  lastName: z.string().min(1, "É necessário informar um sobrenome"),
  email: z
    .string()
    .email("Email inválido")
    .min(1, "É necessário informar um email"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  address: z.string().min(1, "É necessário informar um endereço"),
  city: z.string().min(1, "É necessário informar uma cidade"),
  state: z.string().min(1, "É necessário informar um estado"),
  postalCode: z.string().min(1, "É necessário informar um CEP"),
  phone: z.string().min(1, "É necessário informar um telefone"),
});

type FormData = z.infer<typeof insertUserSchema>;

enum STEPS {
  FIRST = 0,
  SECOND = 1,
}

const states = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<string | boolean>(false);
  const [step, setStep] = useState<STEPS>(STEPS.FIRST);
  const mutation = useCreateUser();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      lastName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("Usário criado com sucesso!");
        router.push("/auth/sign-in");
      },
      onError: () => {
        toast.error("Houve um erro ao criar o usuario!");
      },
    });
    const isValid = await form.trigger();

    if (isValid) {
      setStep(STEPS.SECOND);
    } else {
      toast.error("Preencha todos os campos corretamente");
    }
  };

  const onInvalid = (errors: any) => {
    console.log(errors);
  };

  const role = form.watch("role");

  const handleNextStep = () => {
    setStep(STEPS.SECOND);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Initialize an empty string for the formatted number
    let formattedNumber = "";

    // Apply conditional formatting based on the number of digits
    if (digits.length > 2) {
      formattedNumber += `(${digits.slice(0, 2)}) `;
    } else {
      formattedNumber += digits;
    }

    if (digits.length > 7) {
      formattedNumber += digits.slice(2, 7) + "-" + digits.slice(7, 11);
    } else if (digits.length > 2) {
      formattedNumber += digits.slice(2, 7);
    }

    return formattedNumber;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold text-center">Bem vindo!</h2>
        <h3 className="text-gray-300 text-center">Preencha seus dados</h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          {role === undefined && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                      className="flex flex-col space-y-1">
                      <Label
                        className={cn(
                          role === "PATIENT"
                            ? "bg-sky-400 text-white"
                            : "bg-white text-black",
                          role !== "PATIENT" &&
                            "hover:border-sky-400 hover:text-sky-400",
                          "flex items-center cursor-pointer p-3 border rounded-md transition-colors w-full"
                        )}>
                        <FormControl>
                          <RadioGroupItem value="PATIENT" className="hidden" />
                        </FormControl>
                        <FaUser className="text-2xl mr-2" />
                        <span className="text-lg">Patient</span>
                      </Label>

                      <Label
                        className={cn(
                          role === "DOCTOR"
                            ? "bg-sky-400 text-white"
                            : "bg-white text-black",
                          role !== "DOCTOR" &&
                            "hover:border-sky-400 hover:text-sky-400",
                          "flex items-center cursor-pointer p-3 border rounded-md transition-colors w-full"
                        )}>
                        <FormControl>
                          <RadioGroupItem value="DOCTOR" className="hidden" />
                        </FormControl>
                        <FaUserDoctor className="text-2xl mr-2" />
                        <span className="text-lg">Doctor</span>
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {role !== undefined && STEPS.FIRST === step && (
            <div className="space-y-7">
              <div className="space-y-12">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("name")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Sobrenome
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("lastName")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          type="email"
                          onBlur={() => form.trigger("email")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          type={cn(showPassword ? "text" : "password")}
                          onBlur={() => form.trigger("password")}
                        />
                      </FormControl>
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-0.5 cursor-pointer">
                        {showPassword ? (
                          <FaRegEyeSlash className="text-lg" />
                        ) : (
                          <FaRegEye className="text-lg" />
                        )}
                      </div>

                      {fieldState.error && (
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  className="w-full"
                  disabled={mutation.isPending}
                  onClick={() => form.setValue("role", undefined)}>
                  Back
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  disabled={mutation.isPending}
                  onClick={handleNextStep}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {role !== undefined && STEPS.SECOND === step && (
            <div className="space-y-7">
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <Select onValueChange={field.onChange} defaultValue="">
                        <FormControl>
                          <SelectTrigger
                            className={
                              !field.value
                                ? "text-slate-300 font-semibold border-gray-300"
                                : ""
                            }>
                            <SelectValue placeholder="Seu estado"></SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state, index) => (
                            <SelectItem
                              key={index}
                              value={state}
                              className="font-normal cursor-pointer">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("address")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("address")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Rua
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("address")}
                        />
                      </FormControl>
                      {fieldState.error && ( // Display error message if there is an error
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Código Postal
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onBlur={() => form.trigger("postalCode")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormLabel
                        className={cn(
                          "ml-3 absolute transition-all text-slate-300",
                          field.value
                            ? "-top-5 text-sm bg-milky text-sky-400"
                            : "top-1/2 transform -translate-y-1/2 text-base"
                        )}>
                        Telefone
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-400"
                          disabled={mutation.isPending}
                          value={field.value ?? ""}
                          onChange={(event) => {
                            const formattedPhoneNumber = formatPhoneNumber(
                              event.target.value
                            );
                            field.onChange(formattedPhoneNumber);
                          }}
                          onBlur={() => form.trigger("phone")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-red-500 absolute top-8">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  disabled={mutation.isPending}
                  className="w-full"
                  onClick={() => setStep(STEPS.FIRST)}>
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}>
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
