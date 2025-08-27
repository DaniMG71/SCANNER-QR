import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={require('../assets/img/image.png')}
        style={styles.fondo}
        imageStyle={{ opacity: 0.8 }}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.3)', 'rgba(247, 185, 179, 0.7)']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.7, 1]}
        >
          <StatusBar style="dark" />

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.flechaCirculo}>
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.titulo}>Menú</Text>
          </View>

          {/* Opciones */}
          <View style={styles.seccion}>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("QrScanner")}>
              <Text style={styles.textoBoton}>Escanear con QR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("SearchByName")}>
              <Text style={styles.textoBoton}>Buscar por nombre</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
 {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Cencosud - Todos los derechos reservados</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 60,
  },
  gradientOverlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 10,
  },
  titulo: {
    fontSize: 20,
    fontFamily: 'RobotoSlab_700Bold',
    marginLeft: 8,
    color: '#000',
  },
  seccion: {
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
    marginHorizontal: 20,
  },
  boton: {
    backgroundColor: '#0066B3',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RobotoSlab_700Bold',
  },
  flechaCirculo: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#0066B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
