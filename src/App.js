import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import ContactForm from './ContactForm';
import logo from './sibi.png';
import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <img src={logo} style={{ height: "90%" }} alt="logo"></img>
            <div className="link"><a href="https://sibi-webview-tadscritch.herokuapp.com/"><p>View Contacts</p><div className="arrow"><Icon type="arrow-right"></Icon></div></a></div>
          </Header>
          <Content>
            <ContactForm></ContactForm>
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;
