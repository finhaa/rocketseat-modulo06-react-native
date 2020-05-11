import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Container, Browser, LoadingSpinner } from './styles';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  state = {
    loading: true,
  };

  load() {
    this.setState({ loading: false });
  }

  render() {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository');

    const { loading } = this.state;

    return (
      <Container>       
        {loading ? 
          (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>          
              <LoadingSpinner size="large" color="#7159c1" />
            </View>
          ):(
            <Browser
              onLoad={() => this.load()}
              source={{ uri: repository.html_url }}
            />
          )
        }
      </Container>
    );
  }
}
