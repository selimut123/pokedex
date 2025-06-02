import {FC} from 'react';
import {Pokemon} from '../../util/types';
import {Image, StyleSheet, Text, View} from 'react-native';

interface HeaderType {
  pokemon: Pokemon;
}

const Header: FC<HeaderType> = ({pokemon}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        <View style={styles.types}>
          {pokemon.types.map((t, i) => (
            <View key={i} style={styles.typeTag}>
              <Text style={styles.typeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <Image
        source={{
          uri: pokemon.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <Image
        source={require('../../../assets/image/pokeball.png')}
        style={styles.bgPokeImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    padding: 20,
    position: 'relative',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 16,
    color: '#eee',
    position: 'absolute',
    top: 30,
    right: 20,
  },
  types: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 6,
  },
  typeTag: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeText: {
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
    alignSelf: 'center',
    bottom: -50,
    zIndex: 2,
  },
  bgPokeImage: {
    width: 180,
    height: 180,
    position: 'absolute',
    right: 0,
    bottom: -10,
    opacity: 0.2,
  },
});

export default Header;
