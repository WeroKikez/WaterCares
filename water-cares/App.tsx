import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import WaterConsumption from './components/WaterConsumption';
import PeopleConsumption from './components/PeopleConsumption';

import registerNNPushToken from 'native-notify';
import { useState } from 'react';
import LimitModal from './components/LimitModal';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  registerNNPushToken(21254, 'qePZQ11Iu5sjwmwa0oxIQv');

  const [limit, setLimit] = useState(3.5);
  const [modalVisible, setModalVisible] = useState(true);
  
  const onClose = () => {
    setModalVisible(false);
    console.log(limit)
  }

  return (
    <View style={styles.container}>
      <Header setModalVisible={setModalVisible}/>

      <Text style={styles.mainHeading}>Tu Consumo de Agua</Text>

      <WaterConsumption limit={limit} />

      <PeopleConsumption />

      <LimitModal
        visible={modalVisible}
        setLimit={setLimit}
        onClose={onClose} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  mainHeading: {
    marginHorizontal: 'auto',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 30,
    backgroundColor: '#db2777',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    textTransform: 'uppercase'
  },
});
