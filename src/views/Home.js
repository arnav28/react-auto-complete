import React from 'react';
import SearchBox from '../components/SearchBox/SearchBox';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchResults: []
      };
    }

    triggerSearch = (searchBoxQuery) => {
        // Sanitize input
        // TODO: add validations to cover security risks
        let query = searchBoxQuery.trim();
        if(!query || query.length === 0){
          // Clear out results
          this.setState(state => ({
            searchResults: []
          }));
          return;
        };
        fetch(`/api/getProducts?search=${query}`)
          .then(response => response.json())
          .then(results => {
              // Update state
              this.setState(state => ({
                  searchResults: results
              }));
         })
         .catch(error => {
           // log error
         });
    }
  
    render() {
      return (
        <>
        <div style={{margin: '1rem'}}>
          <h3>Add Financial institution</h3>
          <SearchBox handleChange={this.triggerSearch} suggestions={this.state.searchResults} />
        </div>
        </>
      );
    }
  }

export default Home