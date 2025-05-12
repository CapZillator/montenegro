"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function FiltersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [priceFrom, setPriceFrom] = useState<string>(
    searchParams.get("priceFrom") || ""
  );
  const [priceTo, setPriceTo] = useState<string>(
    searchParams.get("priceTo") || ""
  );
  const [propertyType, setPropertyType] = useState<string[]>(
    searchParams.get("propertyType")?.split(",") || []
  );

  const handleChange = (name: string, value: string | string[]) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(name, value.join(","));
      } else {
        params.delete(name);
      }
    } else {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }

    startTransition(() => {
      router.push("?" + params.toString());
    });
  };

  return (
    <form className="space-y-4">
      <div>
        <label>Property Type</label>
        <select
          multiple
          value={propertyType}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (o) => o.value
            );
            setPropertyType(selected);
            handleChange("propertyType", selected);
          }}
          className="w-full border p-2 rounded"
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      <div>
        <label>Price from</label>
        <input
          type="number"
          value={priceFrom}
          onChange={(e) => {
            setPriceFrom(e.target.value);
            handleChange("priceFrom", e.target.value);
          }}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Price to</label>
        <input
          type="number"
          value={priceTo}
          onChange={(e) => {
            setPriceTo(e.target.value);
            handleChange("priceTo", e.target.value);
          }}
          className="w-full border p-2 rounded"
        />
      </div>
    </form>
  );
}
