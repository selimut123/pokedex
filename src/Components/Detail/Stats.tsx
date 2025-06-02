import {FC} from 'react';
import {Pokemon} from '../../util/types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

interface StatsType {
  pokemon: Pokemon;
}

const Stats: FC<StatsType> = ({pokemon}) => {
  return (
    <ScrollView style={styles.container}>
      {pokemon.stats.map((stat: any, index: number) => {
        const value = stat.base_stat;
        const percentage = Math.min(100, Math.max(0, value));
        const barColor = value < 50 ? '#f44336' : '#3b90f6';

        return (
          <View key={index} style={styles.statRow}>
            <View style={{flex: 4}}>
              <Text
                style={styles.statLabel}
                numberOfLines={1}
                ellipsizeMode="tail">
                {stat.stat.name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.statValue}>{value}</Text>
            </View>
            <View style={{flex: 5}}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${percentage}%`, backgroundColor: barColor},
                  ]}
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statLabel: {
    textTransform: 'capitalize',
    fontSize: 14,
    flexShrink: 1,
    overflow: 'hidden',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default Stats;
