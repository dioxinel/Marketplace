import React from 'react';
import { Formik } from 'formik';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import s from '../Product.module.scss';
import { validation as v } from './validation/Validation';
import AddPhotos from './AddPhotos';

function AddProductForm({onSubmit}) {
  const formikProps = {
    initialValues: {
      title: '',
      location: '',
      description: '',
      price: '',
    },
    onSubmit,
  };

  return (
    <div className="App">
      <Formik {...formikProps}>
        <form className={s.form} id={'form'}>
          <h3>Add product</h3>
          <div className={s.group}>
            <Input
              name="title"
              label="TITLE"
              id="title"
              placeholder={'For example: Iron man suit'}
              validate={v.validateTitle}
            />
          </div>

          <div className={s.group}>
            <Input 
                name="location" 
                label="LOCATION"
                id="location"
                placeholder={'For example: Los Angeles, CA'}
                validate={v.validateTitle}
                />
          </div>
          <div className={s.group}>
            <Input
              as={'textarea'}
              name="description"
              label="DESCRIPTION"
              id="description"
              className={s.description}
              placeholder={'For example: Iron man suit'}
            />
          </div>
          <AddPhotos />
          <div className={s.group}>
            <Input
              name="price"
              label="PRICE"
              id="price"
              placeholder={'For example: 100'}
              validate={v.validatePrice}
            />
          </div>

          <SubmitBTN name={'Submit'} id={'submit'}/>
        </form>
      </Formik>
    </div>
  );
}

export default AddProductForm;
