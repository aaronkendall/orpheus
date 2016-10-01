import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#666666',
    flex: 1
  },
  title: {
    fontSize: 16,
    backgroundColor:'#23CF5F',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15
  },
  body: {
    width: 300,
    paddingTop: 15,
    paddingBottom: 50,
    alignItems: 'center',
  },
  p: {
    fontSize: 12
  },
  textinput: {
    height: 40,
    padding: 5,
    width: 300
  },
  borderBottom: {
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    marginTop: 15,
    width: 300
  },
  button: {
    height: 30,
    backgroundColor: '#23CF5F',
    padding: 20,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: 'center',
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
