"use client";

import { useState } from "react";
import { DoctorCard } from "./doctor-card";
import { Frown, MessageSquare, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/queries/get-doctors";
import { specialties } from "@/specialties";

export const DoctorsClient = ({ data }: { data: Doctors[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get sort option from URL or default to ''
  const sortOption = searchParams.get("sort") || "";

  // Filter data based on search, specialty, and sort option
  let filteredData = data.filter((doctor) => {
    const matchesSpecialty =
      !searchParams.get("specialty") ||
      doctor.specialty === searchParams.get("specialty");
    return matchesSpecialty;
  });

  if (sortOption) {
    filteredData = filteredData.sort((a, b) => {
      const ratingA = typeof a.averageRating === "number" ? a.averageRating : 0;
      const ratingB = typeof b.averageRating === "number" ? b.averageRating : 0;

      if (sortOption === "highest") {
        return ratingB - ratingA;
      } else if (sortOption === "lowest") {
        return ratingA - ratingB;
      }
      return 0;
    });
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const specialty = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (specialty) {
      params.set("specialty", specialty);
    } else {
      params.delete("specialty");
    }
    router.replace(pathname + "?" + params, { scroll: false });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort); // Update the sort option in the URL
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
      router.replace(`/dashboard/patient/doctors/search?${params.toString()}`);
    } else {
      params.delete("q");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Doctors</h1>
      <div className="flex items-center gap-x-2 w-full">
        <Input onChange={handleSearchChange} value={searchQuery} />
        <Button onClick={handleSearchSubmit}>
          <Search className="text-lg" />
        </Button>
      </div>
      {/* filters */}
      <div className="flex items-center justify-end w-full gap-x-2 mt-3">
        <select
          value={searchParams.get("specialty") || ""}
          onChange={handleSpecialtyChange}
          className="w-[180px] p-2 border rounded">
          <option value="">Especialidade</option>
          {specialties.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-[180px] p-2 border rounded">
          <option value="">Nota</option>
          <option value="highest">Maior Nota</option>
          <option value="lowest">Menor Nota</option>
        </select>
      </div>
      {filteredData.length === 0 && (
        <div className="mt-8 bg-white shadow-sm rounded-xl overflow-hidden p-6 text-center">
          <Frown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">
            Nenhum médico encontrado...
          </h3>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredData.map((item, index) => (
          <DoctorCard
            key={index}
            id={item.id}
            name={item.name}
            speciality={item.specialty}
            rating={item.averageRating}
            image={item.image}
            reviewsCount={item.reviewsCount}
          />
        ))}
      </div>
    </div>
  );
};
