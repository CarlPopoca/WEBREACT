import React, {Component} from 'react'

export default class AlertaError extends Component{
  constructor(props){
    super(props);

  }
  render()
  {
    return (
      <div class="alert alert-danger" role="alert">
        {this.props.mensaje}
    </div>
    );
  }
}
