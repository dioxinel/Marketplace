import s from './CreateChatWithSeller.module.scss';
import React, {useState} from 'react';
import Modal from 'react-modal';
import { generatePath, useHistory, useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { UserAvatar } from 'src/components/User/UserAvatar';
import { Location } from '../../Location';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import { Input } from 'src/components/Form/Input/Input';
import { Formik } from 'formik';
import { routes } from 'src/scenes/routes';
import Icon from 'src/components/Icon';

export const CreateChatWithSellerBtn = function() {
    const [isVisible, setIsVisible] = useState(false)
    const history = useHistory()
    const { productId }= useParams();
    const collection = useProductCollection()
    const product = collection.collection.get(productId)

    const formikProps = {
        initialValues: {
          messageText: ''
        },
        onSubmit,
      };


    async function onSubmit(message) {
        try {
            const chatId = await product.createChat.run(message)
            history.push(generatePath(routes.inbox, { chatId }))
        } catch(err) {
            console.log(err)
        } 
    }
    
    function handleClick() {
        setIsVisible(true)
      }
    function handleClose() {
        setIsVisible(false)
      }
    
    const customStyle={
        overlay: {zIndex: 5}
    }


  return (
    <>
        <div 
            onClick={handleClick}
            className={s.createChatButton}
        >  
            <div className={s.textContainer}>Chat With Seller</div>
        </div>
        <Modal isOpen={isVisible} onRequestClose={handleClose} className={s.modal} style={customStyle}>
        <div className={s.modalContainer}>
            <Icon name={'cross'} onClick={handleClose} className={s.cross}/>
            <div className={s.modalTitle}>
                Contact seller
            </div>
            <div className={s.productTitle}>
                {`Subject: ${product.title}`}
            </div>
            <div className={s.sellerInfo}>
                <div>
                    <UserAvatar user={product.owner} className={s.avatar} />
                </div>
                <div className={s.userName}>
                    {product.owner && product.owner.fullName}
                </div>
                <div className={s.userLocation}>
                    <Location />
                </div> 
            </div>
            
             <Formik {...formikProps}>
                <form className={s.form} id={'form'}>
                    <div className={s.group}>
                        <Input
                            as={'textarea'}
                            name="message"
                            label="Message"
                            placeholder={'For example: Iron man suit'}
                            className={s.messageArea}
                        />
                    </div>
                    <SubmitBTN 
                        name={'Submit'} 
                        id={'submit'} 
                        className={s.submitBTN}/>
                </form>
            </Formik>
        </div>

        </Modal>
    </>
    );
  }
