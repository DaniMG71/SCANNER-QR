import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";

const Main = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/img/image.png')}
            style={styles.fondo}
            resizeMode="cover"
            imageStyle={{ opacity: 0.65 }}
        >
            <StatusBar style="light" />
            <View style={styles.container}>
                <Image 
                    source={require('../assets/img/cencosud.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.texto}>¡Bienvenido! Tu carrito nunca fue tan inteligente. Empieza a escanear y sorpréndete.</Text>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Menu")}>
                    <Text style={styles.textoboton}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 60,
        backgroundColor: "transparent",
    },
    texto: {
        fontSize: 22,
        fontFamily: 'RobotoSlab_700Bold',
        color: "#ffffff", // Azul principal
        textAlign: "center",
        marginTop: "30%",
    },
    boton: {
        backgroundColor: "#0066B3", // Naranja corporativo
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
    },
    textoboton: {
        fontSize: 25,
        fontFamily: 'RobotoSlab_700Bold',
        color: "#FFFFFF", // Blanco para contraste
        textAlign: "center",
    },
    fondo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    enlaceCrearCuenta: {
        alignItems: "center",
        marginBottom: 25,
    },
    textoAzul: {
        fontSize: 16,
        color: "#0074FF", // Azul fuerte
        fontFamily: 'RobotoSlab_700Bold',
    },
    textoNaranja: {
        fontSize: 16,
        color: "#F69200", // Naranja corporativo
        fontFamily: 'RobotoSlab_700Bold',
        textDecorationLine: "underline",
    },
    logo: {
        width: 220,   // ajusta tamaño del logo
        height: 120,  
        marginTop: "30%",
    },
});

export default Main;
