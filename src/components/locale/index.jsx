import React, { useEffect, useState } from "react";
import { t } from 'i18next'


export default class Locals extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '123'
    }
  }
  componentDidMount(){
    // console.log(t)
  }

  click = () => {
    this.props.i18n.changeLanguage('en')
  }

  render(){
    const { text } = this.state
    return <div>
      {t('login.password')}
      <button onClick={this.click}>qiehuan</button>
    </div>
  }
}
