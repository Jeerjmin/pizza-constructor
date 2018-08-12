import React, { PureComponent } from 'react';

class BaseFilling extends PureComponent {

    render() {
        const {name,price,size,id,isChecked,handleBaseFill,url} = this.props
        return (
            <div className="constr_base_filling">
                {url?<img src={url}/>:<p>{name}</p>}
                <p>{size}</p>
                <p>{price}</p>
                <input
                    type="radio"
                    value={id}
                    checked={isChecked == id }
                    onChange={handleBaseFill} />
            </div>
        );
    }
}


export default BaseFilling;
