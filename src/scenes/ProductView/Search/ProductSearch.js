import React from 'react';
import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { Formik } from 'formik';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import { useStore } from 'src/stores/createStore';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import s from './SearchProduct.module.scss';
import Icon from 'src/components/Icon';


function ProductSearch() {
    const history = useHistory()
    const store = useStore()

function onSubmit({
    keywords,
    location,
    priceFrom,
    priceTo
  }) {
    store.searchProducts.fetch.run({ 
    keywords,
    location,
    priceFrom,
    priceTo });
    
  }

const formikProps = {
    initialValues: {
    keywords: '',
    location: '',
    priceFrom: '',
    priceTo: ''
    },
    onSubmit
}

  return (
    <div className={s.formContainer}>
      <Formik {...formikProps}>
        <form className={s.searchForm}>
        <div className={s.keywordsField}>
            <Icon name={'search'} />
            <Input
              name="keywords"
              placeholder={'Search products by name'}
              id={"keywords"}  
            />
          </div>
          <div className={s.locationField}>
            <Icon name={'location'} />
            <Input
              name="location"
              id={"location"}
              placeholder={'Location'}
              
            />
          </div>
          {/* <div>
            <Input
              name="priceFrom"
              label="priceFrom"
              id={'priceFrom'}
              placeholder={'100'}
              
            />
          </div>
          <div>
            <Input
              name="priceTo"
              label="priceTo"
              id={'priceTo'}
            />
          </div> */}
          <SubmitBTN name={'Search'} id={'submit'} className={s.searchButton}/>
        </form>
      </Formik>
    </div>
  );
}

export default observer(ProductSearch);
