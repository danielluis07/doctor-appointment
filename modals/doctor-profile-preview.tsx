"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import placeholder from "@/public/placeholder-logo.jpg";
import { IoSchoolOutline } from "react-icons/io5";
import { PiMapPinLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type DoctorProfilePreviewProps = {
  name: string | null | undefined;
  bio: string | null | undefined;
  cfm: string | null | undefined;
  image: string | null | undefined;
  qualifications: string | null | undefined;
  specialty: string | null | undefined;
  address: string | null | undefined;
  address2: string | null | undefined;
  city: string | null | undefined;
  postalCode: string | null | undefined;
  state: string | null | undefined;
  phone: string | null | undefined;
  isLoading: boolean;
};

export const DoctorProfilePreview = ({
  bio,
  cfm,
  address,
  address2,
  city,
  postalCode,
  state,
  phone,
  image,
  name,
  qualifications,
  specialty,
  isLoading,
}: DoctorProfilePreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-1.5 bg-sky-400 text-white rounded-md focus:outline-none hover:bg-blue-600 w-full">
        <span>Ver perfil</span>
      </DialogTrigger>
      <DialogContent className="w-[900px] max-w-4xl">
        <DialogTitle>Perfil</DialogTitle>
        <DialogDescription>
          O seu perfil será divulgado desta maneira para os usuários
        </DialogDescription>
        {isLoading ? (
          <div className="w-full">
            <div className="flex">
              {/* Skeleton Image */}
              <div className="rounded-lg overflow-hidden">
                <Skeleton className="w-[300px] h-[200px]" />
              </div>
              {/* Skeleton Details */}
              <div className="px-8 flex flex-col justify-between w-full">
                <Skeleton className="w-[200px] h-[24px] mb-4" />
                <div className="space-y-2">
                  <Skeleton className="w-[120px] h-[24px] rounded-xl bg-sky-100 mb-2" />
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="w-[20px] h-[20px]" />
                    <Skeleton className="w-[150px] h-[20px]" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="w-[20px] h-[20px]" />
                    <Skeleton className="w-[150px] h-[20px]" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="w-[20px] h-[20px]" />
                    <Skeleton className="w-[100px] h-[20px]" />
                  </div>
                </div>
                <Button disabled>Agendar Consulta</Button>
              </div>
            </div>
            {/* Skeleton Bio */}
            <div>
              <Skeleton className="w-[200px] h-[24px] mb-4" />
              <Skeleton className="w-full h-[100px]" />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex">
              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={image || placeholder}
                  alt="doctor"
                  width={320}
                  height={220}
                />
              </div>
              {/* Details */}
              <div className="px-8 flex flex-col justify-between w-full">
                <h1 className="text-2xl font-bold">{name}</h1>
                <div className="space-y-3">
                  <div className="inline-flex items-center text-sm lg:text-md px-2 py-1 rounded-xl bg-sky-100">
                    {specialty}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <IoSchoolOutline className="text-xl" />
                    <span className="text-[10px]">{qualifications}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <PiMapPinLight className="text-xl" />
                    <span className="text-[10px]">
                      {address} {address2}, {city} - {state}, {postalCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CiPhone className="text-xl" />
                    <span className="text-[10px]">{phone}</span>
                  </div>
                </div>
                <Button className="maxlg:p-1">Agendar Consulta</Button>
              </div>
            </div>
            {/* Bio */}
            <div>
              <h2 className="text-lg font-bold py-4">Sobre o Dr. {name}</h2>
              <p className="text-sm lg:text-md">{bio}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
