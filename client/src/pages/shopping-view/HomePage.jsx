import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostAdButton from '@/components/user/postAdButton';

import Navbar from '../../components/navbar/UserNavbar';
import HeroSection from '../../components/landing/HeroSection';
import CategoryGrid from '../../components/landing/CategoryGrid';
import ProductListings from '../../components/landing/ProductListings';
import Footer from '../../components/landing/Footer';


const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default to user’s state if available
  const [selectedState, setSelectedState] = useState(user?.state || '');
  const [selectedLga, setSelectedLga] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [states, setStates] = useState([]);
  const [lgaList, setLgaList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/location/states')
      .then((res) => setStates(Object.keys(res.data)))
      .catch((err) => console.error('Error loading states', err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/api/location/states/lgas?state=${selectedState}`)
        .then((res) => setLgaList(res.data))
        .catch((err) => console.error('Error loading LGAs', err));
    } else {
      setLgaList([]);
      setSelectedLga('');
    }
  }, [selectedState]);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products', {
        params: { state: selectedState, lga: selectedLga, search: searchTerm },
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching user products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedState]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-gold transition duration-300">
      <Navbar />
      <section className="text-center py-6 px-4">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome back{user?.userName ? `, ${user.userName}` : ''}!
        </h1>
        <p className="text-gray-400">Find great deals or post your own ads</p>
      </section>

      <HeroSection
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        states={states}
        selectedLga={selectedLga}
        setSelectedLga={setSelectedLga}
        lgaList={lgaList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchClick={fetchProducts}
      />

      <CategoryGrid />
      <ProductListings products={products} loading={loading} />
       <PostAdButton user={user} />
 
      <Footer />
    </div>
  );
};

export default HomePage;
