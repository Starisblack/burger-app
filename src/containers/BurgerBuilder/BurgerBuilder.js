import React, { Component } from 'react';

import Aux from '../../hoc/Aux-hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from "../../axios-orders"



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
  
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        open: false,
        loading: false
    }

    updatePurchaseState (ingredients) {

        const Nsum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el
        }, 0)

        this.setState( { purchasable: Nsum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients, [type]: updatedCount
        };
      
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,  [type]: updatedCount
        };

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        
        this.setState({ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        open: false,
        loading: false
    });

    }

    purchaseContinueHandler = () => {

        this.setState({loading: true})

        // add filter method to remove ingredient that wasnt selected

        const selectedIngredient =  Object.keys(this.state.ingredients).filter( igKey => {
            return this.state.ingredients[igKey] > 0
        }).map( igKey => {
            return  { [igKey] : this.state.ingredients[igKey] }
         })

           const updatedList = Object.assign({}, ...selectedIngredient )
        
        
        const order ={
            ingredients: updatedList,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: "Samuel Ogunniyi",
                address: {
                    street: "No. 5 Akinola Street",
                    zipCode: 8905,
                    country: "Nigeria"
                },
             email: "samuelkayode633@gmail.com",
             deliveryMethod: "fastest",
             orderTime: new Date().toLocaleTimeString()
            }
        }
    

        Axios.post("/orders.json", order)
        .then(response => {
            console.log(response.data);
            this.setState({loading:false, open: true})
        })
        .catch(err => {
            console.log(err);
        })

        

    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        

        for ( let key in disabledInfo ) {
            
            disabledInfo[key] = disabledInfo[key] <= 0
        }

       

        
        return (
            <Aux>
               
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} 
                        totalAmt={this.state.totalPrice}
                        openAlert={this.state.open}
                        loading= {this.state.loading}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} 
                    ordered={this.purchaseHandler}
                    />
                   
            </Aux>
        );
    }
}

export default BurgerBuilder;