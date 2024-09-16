"use client"
import Link from "next/link";
import { useMemo, useState } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { useForm } from "react-hook-form";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

// local imports
import { handleSearchChange } from "@/utils";
import filterData from "@/public/json/filters.json";
import communityData from "@/public/json/communities.json";
import { BasicFilterSection, CommunityCard, FilterSection } from "@/components";


export default function Page() {
  const communityList = communityData.communities;
  const filterItems = filterData.states;

  const [, setSearchTerm] = useState("");
  const [filterCleared, setFilterCleared] = useState(false);
  const [filters, setFilters] = useState({
    state: "",
    zipCode: "",
    distance: 0,
  });

  const filteredData = useMemo(() => {
    return communityList.filter((item) => {
      const matchesState = filters.state ? item.state === filters.state : true;
      const matchesZip = filters.zipCode ? item.zipCode === filters.zipCode : true;
      const matchesDistance = filters.distance ? item.distance <= filters.distance : true;

      return matchesState && matchesZip && matchesDistance;
    });
  }, [filters]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setFilterCleared(false);
  };
  const handleCommunitySearchChange = handleSearchChange(setSearchTerm);

  const onClearFilters = () => {
    setFilters({
      state: "",
      zipCode: "",
      distance: 0,
    });
    setFilterCleared(true);
  }
  
  return (
    <main className="min-h-screen flex flex-col gap-4">
      <div style={{ backgroundImage: `url("/communities/happy-senior.jpg")`, backgroundSize: "cover", position: "relative" }} className="bg-black p-4 h-64 md:h-80 flex flex-col md:shrink-0 items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-[24px] md:text-[64px]">Welcome to our Portal</h1>
        <p className="relative text-base md:text-[40px]">Energizing Communities for Climate Action</p>
      </div>
      <BasicFilterSection 
        onSearchChange={handleCommunitySearchChange}
        options={[
          { label: "Create Community", value: "community" },
          { label: "Create Campaign", value: "campaign" },
        ]}
        placeholder={"Type in your community name or zip code to see communities near you"}
      />
      <div className="p-6 flex flex-1 gap-[22px] mt-14">
        <FilterSection filterItems={filterItems} applyFilters={handleApplyFilters} clearFilters={onClearFilters} />
        {filteredData.length > 0 ? (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <CommunityCard 
                key={index}
                type={item.type}
                title={item.title}
                locations={item.locations}
                photoUrl={item?.photoUrl || ""}
                link={item.link}
              />
            ))}
          </div>
          ) : (
            <div className="w-full flex flex-col gap-2 items-center">
              <img src="/empty.svg" alt="empty" className="w-40 h-40" />
              <p>{filterCleared ? "No filters applied" : "No data available for the selected filters"}</p>
            </div>
          )
        }
      </div>
    </main>
  );
}
