"use client";
import { useState, useEffect } from "react";

const UserInfoFill = ({ clerkId }) => {
  const [formData, setFormData] = useState({
    department: "",
    Section: "",
    Semester: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error and success messages
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/userPut/${clerkId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("User information updated successfully!");
      } else {
        setError(result.error || "An error occurred while updating the user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An internal error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Update User Information</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="Section">Section</label>
          <input
            type="text"
            id="Section"
            name="Section"
            value={formData.Section}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="Semester">Semester</label>
          <input
            type="text"
            id="Semester"
            name="Semester"
            value={formData.Semester}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserInfoFill;
