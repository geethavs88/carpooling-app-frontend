import { View, Text, Pressable, StyleSheet } from "react-native";
function PrimaryButton({ children }) {
    function pressHandler() {
        console.log("Pressed!");
    }
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
            style={styles.buttonInnerContainer} 
            onPress={pressHandler} 
            android_ripple={{ color: '#0b93b1ff' }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        borderRadius: 28,
        overflow: 'hidden'

    },
    buttonInnerContainer: {
        backgroundColor: '#4a98c8ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});
export default PrimaryButton;