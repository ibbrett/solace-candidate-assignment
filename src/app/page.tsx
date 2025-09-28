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
    return (
      advocate.firstName.includes(searchTerm) ||
      advocate.lastName.includes(searchTerm) ||
      advocate.city.includes(searchTerm) ||
      advocate.degree.includes(searchTerm) ||
      advocate.specialties.includes(searchTerm) ||
      advocate.yearsOfExperience.toString().includes(searchTerm)
    );
  });

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <div className="my-3">
        <input
          placeholder="search for advocate ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-lg mr-3"
        />
      </div>

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
    </main>
  );
}
