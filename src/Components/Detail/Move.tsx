import {FC, useState, useEffect} from 'react';
import {Pokemon} from '../../util/types';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

interface MoveType {
  pokemon: Pokemon;
}

const Move: FC<MoveType> = ({pokemon}) => {
  const [moves, setMoves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const moveDetails = await Promise.all(
          pokemon.moves.slice(0, 20).map(async (moveEntry: any) => {
            const res = await axios.get(moveEntry.move.url);
            return {
              name: res.data.name,
              type: res.data.type.name,
              power: res.data.power,
              accuracy: res.data.accuracy,
              damage_class: res.data.damage_class.name,
            };
          }),
        );
        setMoves(moveDetails);
      } catch (error) {
        console.error('Error fetching move details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoves();
  }, [pokemon]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3b90f6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {moves.map((move, index) => (
        <View key={index} style={styles.moveCard}>
          <Text style={styles.moveName}>{move.name}</Text>
          <View style={styles.moveDetails}>
            <Text style={styles.detailText}>Type: {move.type}</Text>
            <Text style={styles.detailText}>Power: {move.power ?? 'N/A'}</Text>
          </View>
          <View style={styles.moveDetails}>
            <Text style={styles.detailText}>
              Accuracy: {move.accuracy ?? 'N/A'}
            </Text>
            <Text style={styles.detailText}>Class: {move.damage_class}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveCard: {
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  moveName: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  moveDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default Move;
