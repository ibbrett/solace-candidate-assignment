"use client";

import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [altView, setAltView] = useState(false);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  const formatPhone = (phone: number) => {
    const phoneStr = phone.toString();
    if (phoneStr.length === 10)
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(
        3,
        6
      )} - ${phoneStr.slice(6)}`;
    return "";
  };

  const filteredAdvocates = advocates.filter((advocate) => {
    // find case-insensitive and partial match in strings and string arrays
    const includes = (item: string, searchString: string) => {
      const escapedString = searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(escapedString, "i").test(item);
    };

    const includesArray = (items: string[], searchString: string) =>
      items.some((item) =>
        item.toLowerCase().includes(searchString.toLowerCase())
      );

    return (
      includes(advocate.firstName, searchTerm) ||
      includes(advocate.lastName, searchTerm) ||
      includes(advocate.city, searchTerm) ||
      includes(advocate.degree, searchTerm) ||
      includesArray(advocate.specialties, searchTerm) ||
      includes(advocate.yearsOfExperience.toString(), searchTerm)
    );
  });

  const FilteredTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate, index: number) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  <ul>
                    {advocate.specialties.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{formatPhone(advocate.phoneNumber)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const FilteredCards = () => {
    return (
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 space-x-0 items-stretch">
        {filteredAdvocates.map((advocate: Advocate, index: number) => {
          return (
            <div
              key={index}
              className=" rounded-lg border border-solid border-gray-400 shadow-lg p-6 mx-auto"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900">
                  {advocate.firstName} {advocate.lastName.slice(0, 1)},{" "}
                  <span className="text-xs">{advocate.city}</span>
                </h2>
                <span className="text-xs rounded-full bg-green-200 py-2 px-4 font-semibold hover:bg-amber-200">
                  {advocate.degree}
                </span>
              </div>

              <p className="mt-2 text-gray-500">
                <h3 className="font-medium text-gray-900 inline mr-1">
                  years of experience:
                </h3>
                <span>{advocate.yearsOfExperience}</span>
              </p>
              <p className="mt-2 text-gray-500">
                <h3 className="font-medium text-gray-900 inline mr-1">
                  phone:
                </h3>
                <span>{formatPhone(advocate.phoneNumber)}</span>
              </p>
              <p className="mt-2 text-gray-500">
                <h3 className="font-medium text-gray-900">specialties:</h3>
                <div className="text-xs">{advocate.specialties.join(", ")}</div>
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="bg-green-800 text-white p-2 rounded-lg mb-4 inline-block">
        Solace Advocates
      </h1>
      <div className="my-3">
        <input
          placeholder="search for advocate ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-lg mr-3"
        />
        <a
          className="align-bottom text-sm underline text-blue-600"
          onClick={() => setAltView(!altView)}
        >
          {altView ? "table" : "card"} view
        </a>
      </div>
      {altView ? <FilteredCards /> : <FilteredTable />}
    </main>
  );
}
