import React, { PureComponent } from 'react';

class AdminFilling extends PureComponent {

    render() {
        const {name, size, price, count, url} = this.props
        return (
            <div className="admin_pizza_filling">
                <img src={url} />
                {name?<p>{name}</p>:''}
                {size?<p>Размер: {size}</p>:''}
                {price?<p>Цена: {price*(count?count:1)} рублей</p>:''}
                {count?<p>Количество: {count}</p>:''}
            </div>
        );
    }
}

export default AdminFilling;
