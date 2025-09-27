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
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const handleSearch = () => {
    setFilteredAdvocates(
      advocates.filter((advocate) => {
        return (
          advocate.firstName.includes(searchTerm) ||
          advocate.lastName.includes(searchTerm) ||
          advocate.city.includes(searchTerm) ||
          advocate.degree.includes(searchTerm) ||
          advocate.specialties.includes(searchTerm) ||
          advocate.yearsOfExperience.toString().includes(searchTerm)
        );
      })
    );
  };

  const resetSearch = () => {
    setAdvocates([]);
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

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <div>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <p>
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border rounded-lg mr-3"
          />

          <button
            onClick={handleSearchReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-3"
          >
            Reset
          </button>

          <button
            onClick={handleSearch}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </p>
      </div>
      <br />
      <br />
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
                  <ul style={{ listStyle: "unset", padding: "0 30px" }}>
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
    </main>
  );
}
