import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { db } from "../db/Firebase";
import { onValue, ref, set } from "firebase/database";

import { registerIndieID } from 'native-notify';
import axios from 'axios';

type WaterConsumptionProps = {
  limit: number
}

export default function WaterConsumption({limit} : WaterConsumptionProps) {
  const [waterData, setWaterData] = useState(0.0);
  const [notiSent, setNotiSent] = useState(false);

  const waterAvailable = useMemo(() => (limit - waterData).toFixed(2), [{waterData}])
  const percentage = useMemo(() => (waterData * 100) / limit, [{waterData}])

  useEffect(() => {
    const query = ref(db, "sensores/sensor_1");
    return onValue(query, ( snapshot ) => {
      const data = snapshot.val();
      setWaterData(data.toFixed(2));
    });
  }, []);

  const loginFunction = () => {
    // Native Notify Indie Push Registration Code
    registerIndieID('2418', 21254, 'qePZQ11Iu5sjwmwa0oxIQv');
    // End of Native Notify Code
  }

  const sendNotification = (title : string, message : string) => {
    loginFunction();

    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: '2418',
      appId: 21254,
      appToken: 'qePZQ11Iu5sjwmwa0oxIQv',
      title: title,
      message: message
    });

    console.log("Notification Sent");
  }

  useEffect(() => {
    const query = ref(db, "not/sent");
    onValue(query, ( snapshot ) => {
      const data = snapshot.val();
      setNotiSent(data);
    });

    if(waterData > limit) {
      if(!notiSent) {
        const query = ref(db, "not/");
        set(query, {
            sent: true
        })
        
        sendNotification('Limite Excedido', 'Has excedido el limite en tu consumo de agua');
      }
    } else if (waterData < limit) {
      const query = ref(db, "not/");
      set(query, {
          sent: false
      })
    }
  }, [waterData])

  let color = '3B82f6';
  if(percentage > 80 && percentage < 90) {
    color = 'fb8d32'
  } else if (percentage > 90) {
    color = 'fb3232'
  }

  return (
    <View style={styles.dataContainer}>
        <CircularProgress
            value={percentage > 100 ? 100 : percentage}
            valueSuffix={'%'}
            radius={80}
            progressValueColor={`#${color}`}
            activeStrokeColor={`#${color}`}
            inActiveStrokeColor={`#${color}`}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={20}
            activeStrokeWidth={25}
        />

        <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.dataHeadings}>Consumida: <Text style={{color: '#000'}}>{waterData}L</Text></Text>
            <Text style={styles.dataHeadings}>Limite: <Text style={{color: '#000'}}>{limit.toFixed(2)}L</Text></Text>
            <Text style={styles.dataHeadings}>Disponible: <Text style={{color: '#000'}}>{+waterAvailable < 0 ? 0 : waterAvailable}L</Text></Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    marginHorizontal: 'auto',
    marginBottom: 10,
    width: '90%',
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 10,
    gap: 20,
    justifyContent: 'space-between'
  },
  dataHeadings: {
    color: '#3B82f6',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5
  }
});