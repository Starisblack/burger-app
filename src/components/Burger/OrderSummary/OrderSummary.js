import React from 'react';
import Aux from '../../../hoc/Aux-hoc';
import ActionAlerts from '../../UI/Alert/Alert';
import Button from '../../UI/Button/Button';
import Spinner from "../../UI/Spinner/Spinner"

const orderSummary = ( props ) => {




    

    // add filter method to remove ingredients that was not picked on the list

    const ingredientSummary = Object.keys(props.ingredients).filter( igKey => {
        return props.ingredients[igKey] > 0
    }).map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
        } );


    



    return (
        <Aux>
            
             { props.openAlert ? <ActionAlerts clicked={props.purchaseCancelled}/> :
           
             props.loading ? <Spinner /> : <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: $ { props.totalAmt.toFixed(2)}</strong></p>   
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button> </> }
        </Aux>
    );
};

export default orderSummary;