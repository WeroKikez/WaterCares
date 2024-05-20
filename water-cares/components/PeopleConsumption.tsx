import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { db } from "../db/Firebase";
import { onValue, ref } from "firebase/database";

export default function PeopleConsumption() {

    const [usage, setUsage] = useState(0.0);

    useEffect(() => {
        const query = ref(db, "personas/persona_1");
        return onValue(query, ( snapshot ) => {
            const data = snapshot.val();
            setUsage(data.toFixed(2));
        });
    }, []);

    return (
        <View style={{marginTop: 20}}>
            <Text style={styles.heading}>Consumo Por Persona</Text>

            <View style={styles.peopleContainer}>
                <View style={styles.personData}>
                    <Text style={{color: '#FFF', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 20}}>Emiliano Enríquez:</Text>
                    <Text style={{color: '#FFF',fontWeight: 'bold', fontSize: 20}}>{usage}L</Text>
                </View>
                {/* <View style={styles.personData}>
                    <Text style={{color: '#FFF', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 20}}>Misael Cervantes</Text>
                    <Text style={{color: '#FFF',fontWeight: 'bold', fontSize: 20}}>5.2L</Text>
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        display: 'flex', 
        flexDirection: 'column',
        marginHorizontal: 'auto',
        marginBottom: 20,
        color: '#FFF',
        fontSize: 23,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#e5bc30',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5
    },
    peopleContainer: {
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 'auto'
    },
    personData: {
        display: 'flex', 
        flexDirection: 'row',
        marginHorizontal: 'auto',
        width: '90%',
        justifyContent: 'space-between',
        backgroundColor: '#40d3a2',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 15
    }
})