import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Promotions } from './components/Promotions';
import InitData from './components/InitData';
import { getAllPromotions, createPromotions, getPromotionsMetaData } from './services/PromotionService';

function App() {
  const [promotions, setPromotions] = useState([]);
  const [promotionsMetaData, setPromotionsMetaData] = useState({});

  const getAndSetPromotions = async () => {
      const promotionsData = await getAllPromotions();
      setPromotions(promotionsData.promotions);
  };

  const initData = async (e) => {
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
          const results = await Promise.all([getPromotionsMetaData(), getAllPromotions()]);
          setPromotionsMetaData(results[0].metaData);
          setPromotions(results[1].promotions);
      };

      loadData();
  }, []);

    return (
        <div className="App">
          <Header/>
          <div className="container mrgnbtm">
            <div className="row">
              <div className="col-md-8">
                  <InitData
                      initData={initData}
                    >
                  </InitData>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <Promotions promotions={promotions}
                        promotionsMetaData={promotionsMetaData}
                        deletePromotionFromState={deletePromotionFromState}
                        editPromotionInState={editPromotionInState}
            />
          </div>
        </div>
    );
}

export default App;
