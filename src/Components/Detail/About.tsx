import {FC} from 'react';
import {Pokemon} from '../../util/types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  convertCmToFeetInches,
  convertDmToM,
  convertHgtoKg,
  convertKgToLbs,
} from '../../util/unit';

interface AboutType {
  pokemon: Pokemon;
}

const InfoRow: FC<{label: string; value: string}> = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const About: FC<AboutType> = ({pokemon}) => {
  const heightFeet = convertCmToFeetInches(pokemon.height * 10);
  const heightMeters = convertDmToM(pokemon.height);
  const weightKg = convertHgtoKg(pokemon.weight);
  const weightLbs = convertKgToLbs(weightKg);
  const abilities = pokemon.abilities
    .map((a: any) => a.ability.name)
    .join(', ');

  return (
    <ScrollView style={styles.container}>
      <InfoRow label="Species" value="Seed" />
      <InfoRow label="Height" value={`${heightFeet} (${heightMeters} m)`} />
      <InfoRow label="Weight" value={`${weightLbs} (${weightKg} kg)`} />
      <InfoRow label="Abilities" value={abilities} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    width: 100,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});

export default About;
