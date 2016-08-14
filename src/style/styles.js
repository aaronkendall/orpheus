import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  container: {
    marginTop: 15,
    height: 300,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    width: 300,
    alignItems: 'flex-start',
    paddingTop: 30,
    paddingBottom: 30,
    flex: 0
  },
  body: {
    fontSize: 12,
    width: 300,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  textinput: {
    height: 40,
    padding: 5,
    width: 300,
    flex: 2
  },
  borderBottom: {
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    width: 300
  },
  button: {
    height: 30,
    width: 150,
    backgroundColor: 'powderblue',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 10,
    flex: 0
  },
  songResultCard: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth
  },
  songImage: {
    width: 45,
    height: 45
  },
  songDetails: {
    fontSize: 12
  }
});

export { styles };
