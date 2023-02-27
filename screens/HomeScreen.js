import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import TouchID from 'react-native-touch-id';


const App = ({navigation}) => {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const handleAuth = () => {
    TouchID.isSupported().then(biometryType => {
      if(biometryType === 'FaceID'){
        // Alert.alert('FaceID is supported.')
        TouchID.authenticate('', optionalConfigObject)
        .then(success => {
         navigation.replace("ProtectedScreen");
        })
        .catch(error => {
          Alert.alert('Authentication Failed', error.message);
        })
      } else {
        TouchID.authenticate('', optionalConfigObject)
        .then(success => {
          Alert.alert('Success', success.message);
        })
        .catch(error => {
          Alert.alert('Authentication Failed', error.message);
        });
      }
    })
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text>Authenticate to Continue</Text>
      <Button 
      onPress={handleAuth}
      title='Click Here'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
