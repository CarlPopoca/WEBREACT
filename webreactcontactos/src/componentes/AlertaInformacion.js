import React, {Component} from 'react'

export default class AlertaInformacion extends Component{
  constructor(props){
    super(props);
  }
  render()
  {
    return (
      <div class="alert alert-info" role="alert">
        {this.props.mensaje}
    </div>
    );
  }
}
