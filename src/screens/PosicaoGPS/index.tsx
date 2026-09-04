import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';

export default function PosicaoGpsScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada à localização do dispositivo');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        setAddress(reverseGeocode[0]);
      } else {
        setErrorMsg('Endereço não encontrado para estas coordenadas');
      }
    }
    getCurrentLocation();
  }, []);

  let rua = 'Aguardando localização'
  let numero = 'Aguardando localização'
  let bairro = 'Aguardando localização'
  let cidade = 'Aguardando localização'
  let cep = 'Aguardando localização'


  if (errorMsg) {
    rua = errorMsg;
    numero = errorMsg;
    bairro = errorMsg;
    cidade = errorMsg;
    cep = errorMsg;

  } else if (address) {
    rua =  `${address.street || ''}`
    numero =`${address.streetNumber || 'S/N'}`
    bairro = `${address.district || address.subregion || ''}`
    cidade =  `${address.city || ''} - ${address.region || ''}`
    cep = `${address.postalCode || ''}`;
  }

  return (
    <View style={styles.container}>
      <View />
      <Text style={styles.titleScreen}>Posição atual detectada</Text>
      <Text style={styles.card}>Rua: {rua}</Text>
      <Text style={styles.card}>Número: {numero}</Text>
      <Text style={styles.card}>Bairro: {bairro}</Text>
      <Text style={styles.card}>Cidade: {cidade}</Text>
      <Text style={styles.card}>CEP: {cep}</Text>

    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,                 // Ocupa toda a área disponível da tela
    backgroundColor: "#f6f6f6", // Cinza muito claro como fundo
    justifyContent: "center", // Centraliza os filhos verticalmente (eixo principal)
    alignItems: "center",    // Centraliza os filhos horizontalmente (eixo cruzado)
  },

  // Exibe o texto do GPS ou mensagem de status
  paragraph: {
    fontSize: 18,            // Tamanho médio para boa legibilidade
    textAlign: "center",     // Centraliza o texto dentro do componente
    color: "#b12727",        // Vermelho — chama atenção para os dados exibidos
  },

  // Espaçamento superior (reservado para um possível cabeçalho futuro)
  header: {
    paddingHorizontal: 16, // Espaço interno lateral
    paddingTop: 20,        // Espaço interno superior
  },

  // Título exibido acima dos dados de localização
  titleScreen: {
    fontSize: 18,        // Mesmo tamanho dos dados — ambos no centro da tela
    fontWeight: "bold",  // Negrito para diferenciar do parágrafo de dados
    color: "#1E293B",    // Azul-escuro quase preto — cor de texto primária
    paddingBottom: 20
  },

card: {
  width: "100%",              // Força o card a ocupar toda a largura disponível
  alignSelf: "center",        // Garante que ele fique centralizado na tela
  flexDirection: "row",       
  alignItems: "center",       
  justifyContent: "space-between", 
  minHeight: 52,              
  backgroundColor: "#FFFFFF", 
  borderRadius: 10,           
  paddingHorizontal: 16,      
  paddingVertical: 12,        
  borderWidth: 1,
  borderColor: "#E4E8E5",
    
},

  
});