import {FC} from 'react';
import {PokemonType} from '../util/types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CARD_HEIGHT, CARD_MARGIN, CARD_WIDTH} from '../util/constant';

interface CardType {
  id: number;
  name: string;
  types: PokemonType[];
  uri: string;
  bgColor: string;
  onPress: () => void;
}

const Card: FC<CardType> = ({id, name, types, uri, bgColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: bgColor}]}>
      <View style={styles.pokeNo}>
        <Text style={styles.id}>#{id.toString().padStart(3, '0')}</Text>
      </View>

      <View style={styles.typeCol}>
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        {types.map((t, i) => (
          <View key={i} style={styles.typeTag}>
            <Text style={styles.typeText}>{t.type.name}</Text>
          </View>
        ))}
      </View>

      <Image source={{uri: uri}} style={styles.image} />
      <Image
        source={require('../../assets/image/pokeball.png')}
        style={styles.pokeImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: CARD_MARGIN,
    position: 'relative',
    borderRadius: 16,
    padding: 10,
    overflow: 'hidden',
  },
  pokeNo: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  id: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  typeCol: {
    flexDirection: 'column',
    marginTop: 12,
    gap: 4,
  },
  typeTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 10,
    color: '#fff',
    textTransform: 'capitalize',
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 5,
    bottom: 5,
    zIndex: 2,
  },
  pokeImage: {
    width: 70,
    height: 70,
    position: 'absolute',
    right: 5,
    bottom: 5,
    opacity: 0.5,
  },
});

export default Card;
