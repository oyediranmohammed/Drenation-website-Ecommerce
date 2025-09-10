import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Navbar from '../../components/landing/navbar';
import HeroSection from '../../components/landing/HeroSection';
import CategoryGrid from '../../components/landing/CategoryGrid';
import ProductListings from '../../components/landing/ProductListings';
import PostAdButton from '../../components/landing/PostAdButton';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [lgaList, setLgaList] = useState([]);
  const [selectedLga, setSelectedLga] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios
      .get('http://localhost:5000/api/location/states')
      .then((response) => {
        setStates(Object.keys(response.data));
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`http://localhost:5000/api/location/states/lgas?state=${selectedState}`)
        .then((response) => {
          setLgaList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching LGAs:', error);
        });
    } else {
      setLgaList([]);
      setSelectedLga('');
    }
  }, [selectedState]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          state: selectedState,
          lga: selectedLga,
          search: searchTerm,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    fetchProducts();
  };

  const handlePostAd = () => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    } else {
      navigate('/shop/account');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-gold transition duration-300 relative">
      <Navbar />
      <HeroSection 
        selectedState={selectedState} 
        setSelectedState={setSelectedState} 
        states={states} 
        selectedLga={selectedLga} 
        setSelectedLga={setSelectedLga} 
        lgaList={lgaList} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearchClick={handleSearchClick} 
      />
      <CategoryGrid />
      <ProductListings products={products} loading={loading} />
      <PostAdButton handlePostAd={handlePostAd} />
      <Footer />
    </div>
  );
};

export default LandingPage;
