import { Dispatch } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps ={
  setModalVisible: Dispatch<React.SetStateAction<boolean>>
}

export default function Header({setModalVisible} : HeaderProps) {
  return (
    <View style={styles.header}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={{
            width: '90%',
            marginBottom: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Text style={{color: '#FFF', fontWeight: 'bold', textTransform: 'uppercase'}}>Casa Enriquez</Text>
          <Text 
          style={{
            color: '#FFF', fontWeight: 'light', textTransform: 'uppercase'
          }}
          onPress={() => setModalVisible(true)}
          >Emiliano Enríquez</Text>
        </View>
          
        <Text style={{
          fontSize: 32,
          color: '#FFF',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }} >Water Cares</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2563eb',
    width: '100%',
  },
  safeAreaHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 25
  },
});