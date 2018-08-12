import React, { PureComponent } from 'react';

class PizzaBaseElement extends PureComponent {


    render() {
        console.log('PizzaBaseElement.js render')
        const {name,size,price,count,url} = this.props
        return (
            <div  className="pizza_base_filling">
                {url?<img src={url}/>:''}
                {name?<p>{name}</p>: ''}
                {size?<p>Размер: {size}</p>:''}
                {price?<p>Цена: {price*(count?count:1)} рублей</p>:''}
            </div>
        );
    }
}


export default PizzaBaseElement;
