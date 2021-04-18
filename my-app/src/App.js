import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Promotions } from './components/Promotions';
import { getPromotions, createPromotions, getPromotionsMetaData, getPagesOfPromotions } from './services/PromotionService';
import { NUM_OF_RENDERING_PAGES, PAGE_SIZE, FIRST_PAGE  } from './util/util';

function App() {
  const [promotions, setPromotions] = useState([]);
  const [promotionsMetaData, setPromotionsMetaData] = useState({});
  const [pageData, setPageData] = useState({hasNextPage: true, lowestCurrentPage: FIRST_PAGE});

  const getAndSetPromotions = async (page, isBottom) => {
      const promotionsData = await getPromotions(page);

      setPageData((pageData) => {
          return Object.assign({}, pageData, {hasNextPage: promotionsData.hasNextPage});
      });
      setPromotions((promotions) => isBottom ?
          [...promotions.slice(PAGE_SIZE), ...promotionsData.promotions] :
          [...promotionsData.promotions, ...promotions.slice(0, (NUM_OF_RENDERING_PAGES -1 ) * PAGE_SIZE)]
      );
  };

  const getAndResetCurrentPromotions = async () => {
      const promotionsData = await getPagesOfPromotions(pageData.lowestCurrentPage, PAGE_SIZE, NUM_OF_RENDERING_PAGES);
      setPromotions(promotionsData.promotions);
    };

  const updateLowestCurrentPage = (isBottom) => {
      setPageData((pageData) => {
          const newLowestPage = pageData.lowestCurrentPage + (isBottom ? 1 : -1);
          return Object.assign({}, pageData, {lowestCurrentPage: newLowestPage});
      });
  };

  const initData = async () => {
      await createPromotions();
      const promotionsData = await getPromotions(FIRST_PAGE, PAGE_SIZE * NUM_OF_RENDERING_PAGES);
      setPromotions(promotionsData.promotions);
      setPageData((pageData) => {
          return Object.assign({}, pageData, {lowestCurrentPage: FIRST_PAGE});
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
          const results = await Promise.all([getPromotionsMetaData(), getPromotions(FIRST_PAGE, PAGE_SIZE * NUM_OF_RENDERING_PAGES)]);
          setPromotionsMetaData(results[0].metaData);
          setPromotions(results[1].promotions);
      };

      loadData();
  }, []);

    // Not used -it's suppose to render only the deleted promotion but now we render the entire page
    const deletePromotionFromState = (promotionId) => {
        setPromotions((promotions) => {
            return promotions.filter((promotion) => {
                return promotion._id !== promotionId;
            });
        });
    };

    return (
        <div style={{height: '100%'}}>
            <Header initData={initData}/>
            <Promotions promotions={promotions}
                        promotionsMetaData={promotionsMetaData}
                        deletePromotionFromState={getAndResetCurrentPromotions}
                        editPromotionInState={editPromotionInState}
                        fetchMorePromotions={getAndSetPromotions}
                        pageData={pageData}
                        updateLowestCurrentPage={updateLowestCurrentPage}
            />
        </div>
    );
}

export default App;
