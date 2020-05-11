import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: true,
    refreshing: false,
    moreItems: true,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?`, {
      params: { page },
    });

    if (!response.data || response.data === [] || response.data === null) {
      this.setState({ moreItems: false });

      return;
    }

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      page,
      refreshing: false,
    });
  };

  loadMore = () => {
    const { page, moreItems } = this.state;

    if (!moreItems) return;

    const nextPage = page + 1;

    this.loadRepositories(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadRepositories);
  };

  handleNavigate = (repository) => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  renderItem = ({ item }) => {
    return (
      <Starred onPress={() => this.handleNavigate(item)}>
        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
        <Info>
          <Title>{item.name}</Title>
          <Author>{item.owner.login}</Author>
        </Info>
      </Starred>
    );
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={this.renderItem}
            onEndReachedTreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
          />
        )}
      </Container>
    );
  }
}
