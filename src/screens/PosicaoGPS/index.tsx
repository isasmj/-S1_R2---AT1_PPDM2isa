import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import { MotiView, MotiText } from 'moti';

export default function PosicaoGpsScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [endereco, setEndereco] = useState<Location.LocationGeocodedAddress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada a localização do dispositivo');
        return;
      }
      try {
        const currentPosition = await Location.getCurrentPositionAsync();
        setLocation(currentPosition);

        const resultadoPosition = await Location.reverseGeocodeAsync({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude
        })
        if (resultadoPosition.length > 0) {
          setEndereco(resultadoPosition[0]);
          ;
        }
      } catch (error) {
        setErrorMsg("Erro ao obter loc")
        console.error(error)
      }
    }
    getCurrentLocation();

  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>Posição atual detectada</Text>


      {errorMsg && (
        <Text style={styles.paragraph}>{errorMsg}</Text>
      )}

      {endereco && (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Rua:</Text>
            <Text style={styles.value}>{endereco.street || "N/A"}, {endereco.streetNumber || ""}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Bairro:</Text>
            <Text style={styles.value}>{endereco.district || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.value}>{endereco.city || "N/A"} - {endereco.region || ""}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>CEP:</Text>
            <Text style={styles.value}>{endereco.postalCode || "N/A"}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Grafite escuro moderno
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleScreen: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 25,
    textTransform: "uppercase",
  },
  card: {
    width: "100%",
    backgroundColor: "#1E293B", // Fundo do Card
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#E11D48", // Borda em vermelho vivo (Crimson)
    shadowColor: "#E11D48", // Brilho sutil vermelho para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Sombra para Android
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155", // Linha divisória interna discreta
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8", // Cinza claro para as legendas
    textTransform: "uppercase",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F8FAFC", // Branco limpo para os dados de endereço
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#F43F5E", // Vermelho vibrante de erro
    backgroundColor: "#27161A",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F43F5E",
    marginTop: 20,
    width: "100%",
  },
});