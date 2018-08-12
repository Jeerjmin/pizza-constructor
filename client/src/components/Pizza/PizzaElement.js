import React, { PureComponent } from 'react';

class PizzaElement extends PureComponent {

    render() {
        console.log('PizzaElement.js render')
        const {name, size, price, count, removeCount, addCount, type, url} = this.props
        return (
            <div className="pizza_filling">
                <img src={url} />
                {name?<p>{name}</p>:''}
                {size?<p>Размер: {size}</p>:''}
                {price?<p>Цена: {price*(count?count:1)} рублей</p>:''}
                {count?<p>Количество: {count}</p>:''}
                <div>
                    <input className="count pizza_filling_remove" type="button" onClick={() => removeCount(type)} value="-"/>
                    <input className="count pizza_filling_add" type="button" onClick={() => addCount(type)} value="+"/>
                </div>
            </div>
        );
    }
}


export default PizzaElement;
