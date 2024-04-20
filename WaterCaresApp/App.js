import CircularProgress from 'react-native-circular-progress-indicator';
import { StyleSheet, Text, View } from 'react-native';

const username = "Emiliano";
const waterLimit = 50;
const waterConsumption = 12.49;
const percentage = (waterConsumption * 100) / waterLimit;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido {username}</Text>
      <Text style={styles.heading}>Casa Enriquez</Text>

      <Text style={styles.secondHeading}>Tu Consumo De Agua:</Text>
      
      <CircularProgress
        value={percentage}
        valueSuffix={'%'}
        radius={80}
        progressValueColor={'#3B82f6'}
        activeStrokeColor={'#3B82f6'}
        inActiveStrokeColor={'#3B82f6'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20}
        activeStrokeWidth={25}
      />

      <Text style={styles.text}>Limite: {waterLimit} Litros</Text>
      <Text style={styles.text}>Usada: {waterConsumption} Litros</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical: 100
  },
  welcome: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 10
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 40
  },
  secondHeading: {
    fontSize: 30,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 25
  }, 
  text: {
    marginTop: 35,
    fontSize: 23,
    color: 'white',
    backgroundColor: 'blue',
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderRadius: 10
  }
});
