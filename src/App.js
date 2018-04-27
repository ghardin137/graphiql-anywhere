import React, { Component } from 'react';
import './App.css';
import "graphiql/graphiql.css"
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

class App extends Component {

  state = {
    endpoint: ''
  }

  graphQLFetcher = (graphQLParams) => {
    return fetch(this.state.endpoint, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  changeEndpoint = (event) => {
    this.setState({ endpoint: event.target.value });
  }

  render() {
    const urlRegex = new RegExp("https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)","i");
    return (
      <div className="App">
        <header>
          <span>Enter a GraphQL endpoint</span>
          <input type="text" value={this.state.endpoint} onChange={this.changeEndpoint} />
        </header>
        <div className="flex-grow">
          { this.state.endpoint !== '' && !urlRegex.test(this.state.endpoint) ?
            <GraphiQL fetcher={this.graphQLFetcher} />
          : <div>Please Enter a Url above</div>}
        </div>
      </div>
    );
  }
}

export default App;
