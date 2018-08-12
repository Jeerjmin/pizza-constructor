import React, { PureComponent } from 'react';

class Filling extends PureComponent {

  funClick = () => {
      this.props.handleFill(this.props.filling)
  }

  render() {
      const {name, price, weight, size, url} = this.props
      return (
          <div onClick={this.funClick} className="constr_filling">
              <img src={url} />
              <p>{name}</p>
              <p>{price}</p>
              <p>{weight}</p>
              <p>{size}</p>
          </div>
      );

  }
}

export default Filling;
