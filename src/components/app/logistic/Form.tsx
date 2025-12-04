"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogisticForm {
  name2: string;
}

export default function Form({ name2 }: LogisticForm) {
  const [name, setName] = useState<string>("Jose Cabro");
  const [listTable, setListTable] = useState<any[]>([
    {
      id: 1,
      name: "Jhon",
      lastName: "Milla",
    },
    {
      id: 2,
      name: "Jose",
      lastName: "David",
    },
  ]);
  const router = useRouter();

  return (
    <>
      {name2}
      {listTable.map((item: any, index: number) => {
        return (
          <div key={`${item.id}`}>
            <span>{item.name}</span>
            <span>{item.lastName}</span>
          </div>
        );
      })}
    </>
  );
}
