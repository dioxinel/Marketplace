import React from 'react';
import { Formik } from 'formik';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import s from '../Product.module.scss';
import { AddPhotos } from './AddPhotos';

function AddProductForm({onSubmit, addPhoto, photosLinkList}) {
  const formikProps = {
    initialValues: {
      title: '',
      location: '',
      description: '',
      photos: '',
      price: '',
    },
    onSubmit,
  };

  return (
    <div className="App">
      <Formik {...formikProps}>
        <form className={s.form}>
          <h3>Add product</h3>
          <div className={s.group}>
            <Input
              name="title"
              label="TITLE"
              placeholder={'For example: Iron man suit'}
            />
          </div>

          <div className={s.group}>
            <Input 
                name="location" 
                label="LOCATION" 
                placeholder={'For example: Los Angeles, CA'}
                />
          </div>
          <div className={s.group}>
            <Input
              as={'textarea'}
              name="description"
              label="DESCRIPTION"
              className={s.description}
              placeholder={'For example: Iron man suit'}
            />
          </div>
          <AddPhotos addItem={addPhoto} photosLinkList={photosLinkList}/>
          <div className={s.group}>
            <Input
              name="price"
              label="PRICE"
              placeholder={'For example: 100'}
            />
          </div>

          <SubmitBTN name={'SUBMIT'} />
        </form>
      </Formik>
    </div>
  );
}

export default AddProductForm;
