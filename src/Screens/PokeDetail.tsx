import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PokemonTypeName, typeColors} from '../util/constant';
import {TabView} from 'react-native-tab-view';
import {Pokemon} from '../util/types';
import {RootStackParamList} from '../Navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import About from '../Components/Detail/About';
import Stats from '../Components/Detail/Stats';
import Evolution from '../Components/Detail/Evolution';
import Move from '../Components/Detail/Move';
import Header from '../Components/Detail/Header';
import CustomTabBar from '../Components/CustomTabBar';

const initialLayout = {width: Dimensions.get('window').width};

type PokeDetailRouteProp = RouteProp<RootStackParamList, 'PokeDetail'>;

const PokeDetail = () => {
  const route = useRoute<PokeDetailRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'about', title: 'About'},
    {key: 'stats', title: 'Base Stats'},
    {key: 'evolution', title: 'Evolution'},
    {key: 'moves', title: 'Moves'},
  ]);

  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  const fetchPokemonDetail = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!pokemon) return <Text>Loading...</Text>;

  const bgColor =
    typeColors[pokemon.types[0].type.name as PokemonTypeName] || '#81a596';

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'about':
        return <About pokemon={pokemon} />;
      case 'stats':
        return <Stats pokemon={pokemon} />;
      case 'evolution':
        return <Evolution pokemon={pokemon} />;
      case 'moves':
        return <Move pokemon={pokemon} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons size={24} color="#eee" name="chevron-back" />
      </TouchableOpacity>

      <Header pokemon={pokemon} />
      <View style={styles.tabContainer}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          // Initially, I want to use react-native-tab-view TabBar Component,
          // but they don't support label styling anymore.
          // Ref: https://reactnavigation.org/docs/tab-view/#tabbar
          renderTabBar={props => <CustomTabBar {...props} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tab: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokeDetail;
