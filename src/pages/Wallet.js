import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  state = {
    actualElement: {},
  };

  changeInput = (ele) => {
    this.setState({ actualElement: ele });
  };

  render() {
    const { actualElement } = this.state;
    return (
      <div>
        <h1>Carteira</h1>
        <Header />
        <WalletForm editElement={ actualElement } />
        <Table changeInput={ this.changeInput } />
      </div>
    );
  }
}

export default Wallet;
