import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import axios from 'axios';
import {CARD_MARGIN, PokemonTypeName, typeColors} from '../util/constant';
import {Pokemon, PokemonListItem} from '../util/types';
import Card from '../Components/Card';

interface HomeProps {
  navigation: {
    navigate: (screen: string, params: {id: number}) => void;
  };
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      const listResponse = await axios.get<{
        results: PokemonListItem[];
        next: string;
      }>('https://pokeapi.co/api/v2/pokemon?limit=20');
      const detailed = await Promise.all(
        listResponse.data.results.map(p =>
          axios.get<Pokemon>(p.url).then(res => res.data),
        ),
      );
      setPokemonList(detailed);
      setNextUrl(listResponse.data.next);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePokemonList = async () => {
    if (!nextUrl || loadingMore) return;
    try {
      setLoadingMore(true);
      const listResponse = await axios.get<{
        results: PokemonListItem[];
        next: string;
      }>(nextUrl);
      const detailed = await Promise.all(
        listResponse.data.results.map(p =>
          axios.get<Pokemon>(p.url).then(res => res.data),
        ),
      );
      setPokemonList(prev => [...prev, ...detailed]);
      setNextUrl(listResponse.data.next);
    } catch (error) {
      console.error('Error fetching more Pokémon:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const renderItem: ListRenderItem<Pokemon> = ({item}) => {
    const primaryType = item.types[0]?.type?.name as PokemonTypeName;
    const bgColor = typeColors[primaryType] || '#81a596';

    return (
      <Card
        id={item.id}
        name={item.name}
        types={item.types}
        uri={item.sprites.front_default}
        bgColor={bgColor}
        onPress={() => navigation.navigate('PokeDetail', {id: item.id})}
      />
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={pokemonList}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Pokedex</Text>
            <Text>by bryan christiano</Text>
          </View>
        )}
        onEndReached={fetchMorePokemonList}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size={'large'} style={{margin: 20}} />
          ) : null
        }
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    padding: CARD_MARGIN,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
