import { useState, Dispatch } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type LimitModalProps = {
    visible: boolean
    setLimit: Dispatch<React.SetStateAction<number>>
    onClose: () => void
}

export default function LimitModal({visible, setLimit, onClose} : LimitModalProps) {
    const [selectedLimit, setSelectedLimit] = useState(3.5); // Default limit

    const handleLimitChange = (limit : number) => {
        setSelectedLimit(limit);
    }

    const handleConfirm = () => {
        setLimit(selectedLimit);
        console.log('Clossing');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <Text>Selecciona un Limite</Text>
                    <Picker
                        selectedValue={selectedLimit}
                        onValueChange={(itemValue) => handleLimitChange(itemValue)}
                    >
                         <Picker.Item label="3.5" value={3.5} /> 
                         <Picker.Item label="5" value={5} /> 
                         <Picker.Item label="10" value={10} /> 
                    </Picker>
                    <Button title="Confrimar" onPress={handleConfirm} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 10
    },
})