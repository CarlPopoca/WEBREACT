import React, {Component} from 'react'

export default class AlertaExclamacion extends Component{
  constructor(props){
    super(props);

  }
  render()
  {
    return (
      <div className="alert alert-warning" role="alert">
        {this.props.mensaje}
      </div>
    );
  }
}
