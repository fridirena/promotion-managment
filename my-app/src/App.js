import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Promotions } from './components/Promotions';
import { getAllPromotions, createPromotions, getPromotionsMetaData } from './services/PromotionService';
import {NUM_OF_RENDERING_PAGES, PAGE_SIZE  } from './util/util';

function App() {
  const [promotions, setPromotions] = useState([]);
  const [promotionsMetaData, setPromotionsMetaData] = useState({});

  const getAndSetPromotions = async (page) => {
      const promotionsData = await getAllPromotions(page);
      setPromotions((promotions) => [...promotions, ...promotionsData.promotions]);
  };

  const initData = async () => {
      await createPromotions();
      await getAndSetPromotions();
  };

  const deletePromotionFromState = (promotionId) => {
      setPromotions((promotions) => {
        return promotions.filter((promotion) => {
            return promotion._id !== promotionId;
        });
      });
  };

  const editPromotionInState = (promotionToEdit) => {
      setPromotions((promotions) => {
        return promotions.map((promotion) => {
            return promotion._id === promotionToEdit._id ? promotionToEdit : promotion;
        });
      });
  };

  useEffect(() => {
      const loadData = async () => {
          const results = await Promise.all([getPromotionsMetaData(), getAllPromotions(1, PAGE_SIZE * NUM_OF_RENDERING_PAGES)]);
          setPromotionsMetaData(results[0].metaData);
          setPromotions(results[1].promotions);
      };

      loadData();
  }, []);

    return (
        <div style={{height: '100%'}}>
            <Header initData={initData}/>
            <Promotions promotions={promotions}
                        promotionsMetaData={promotionsMetaData}
                        deletePromotionFromState={deletePromotionFromState}
                        editPromotionInState={editPromotionInState}
                        fetchMorePromotions={getAndSetPromotions}
            />
        </div>
    );
}

export default App;
