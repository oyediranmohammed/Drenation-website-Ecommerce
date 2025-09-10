import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostAdPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    state: user?.state || "",
    lga: "",
    image: null,
  });

  const [states, setStates] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch states
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/location/states")
      .then((res) => setStates(Object.keys(res.data)))
      .catch((err) => console.error("Error loading states", err));
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (formData.state) {
      axios
        .get(
          `http://localhost:5000/api/location/states/lgas?state=${formData.state}`
        )
        .then((res) => setLgaList(res.data))
        .catch((err) => console.error("Error loading LGAs", err));
    } else {
      setLgaList([]);
    }
  }, [formData.state]);

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post an ad");
      return;
    }

    setLoading(true);

    try {
      const adData = new FormData();
      Object.keys(formData).forEach((key) => {
        adData.append(key, formData[key]);
      });
      adData.append("userId", user._id);

      await axios.post("http://localhost:5000/api/shop/post-ad", adData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Ad posted successfully!");
      navigate("/"); // Redirect to home 
    } catch (err) {
      console.error("Error posting ad", err);
      alert("Failed to post ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-black dark:text-gold p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Post a New Ad</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Ad Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-black text-white"
        />

        <textarea
          name="description"
          placeholder="Ad Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded  bg-black text-white"
          rows="4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded  bg-black text-white"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-black text-white"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* State */}
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded  bg-black text-white"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* LGA */}
        <select
          name="lga"
          value={formData.lga}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded  bg-black text-white"
        >
          <option value="">Select LGA</option>
          {lgaList.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded  bg-black text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Posting..." : "Post Ad"}
        </button>
      </form>
    </div>
  );
};

export default PostAdPage;
