import { TextInput, StyleSheet, View, Text } from 'react-native';

function InputField(props) {
    return(
        <TextInput {...props} style={styles.inputFieldStyle} />

    );
}
const styles = StyleSheet.create({
    inputFieldStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white'
    }
});

export default InputField;