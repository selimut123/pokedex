import {FC, useState, useEffect} from 'react';
import {Pokemon} from '../../util/types';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

interface EvolutionType {
  pokemon: Pokemon;
}

const Evolution: FC<EvolutionType> = ({pokemon}) => {
  const [evolutionChain, setEvolutionChain] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const speciesRes = await axios.get(pokemon.species.url);
        const evolutionChainUrl = speciesRes.data.evolution_chain.url;

        const evolutionRes = await axios.get(evolutionChainUrl);
        const chain = evolutionRes.data.chain;

        const speciesNames = [];
        let current = chain;
        while (current) {
          speciesNames.push(current.species.name);
          current = current.evolves_to[0];
        }

        const speciesDetails = await Promise.all(
          speciesNames.map(async name => {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${name}`,
            );
            return {
              name: res.data.name,
              image: res.data.sprites.other['official-artwork'].front_default,
            };
          }),
        );

        setEvolutionChain(speciesDetails);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  return (
    <ScrollView contentContainerStyle={styles.evolutionContainer}>
      {evolutionChain.map((evo, index) => (
        <View key={index} style={styles.evolutionItem}>
          <View
            style={{
              width: 35,
              height: 35,
              borderWidth: 3,
              padding: 5,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#3b90f6',
            }}>
            <Text
              style={{
                fontSize: 14,
              }}>
              {index + 1}
            </Text>
          </View>
          <Image source={{uri: evo.image}} style={styles.evolutionImage} />
          <Text style={styles.evolutionName}>{evo.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  evolutionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  evolutionItem: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
  },
  evolutionImage: {
    width: 100,
    height: 100,
  },
  evolutionName: {
    marginTop: 5,
    textTransform: 'capitalize',
  },
});

export default Evolution;
