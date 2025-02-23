import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "./Validation";
import { useApi } from "../Context/ApiContext";

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
}



const Registration = () => {
  const navigate = useNavigate();
  const { registerUser } = useApi();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { error } = registrationSchema.validate(formData, { abortEarly: false });
    if (!error) return true;

    const newErrors: Record<string, string> = {};
    error.details.forEach((err) => {
      newErrors[err.path[0] as string] = err.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(formData);
      alert("🎉 Registration successful! Redirecting to login...");
      navigate("/login");
    } catch {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-left">Create an Account</h2>

        {errors.general && <p className="text-red-600 text-left text-sm">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {["username", "name", "email", "password"].map((field) => (
            <div key={field} className="text-left">
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormComplete || loading}
            className={`w-full text-sm p-2 rounded-md transition duration-300 ${
              isFormComplete
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-left text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
