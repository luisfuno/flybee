
import React from 'react';
import { Platform, TouchableOpacity, ImageBackground, StyleSheet, Text, Image, View, ProgressBarAndroid, Dimensions } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { Container, Item, Form, Input, Button, Label } from "react-native";
import * as Location from 'expo-location';
import * as Google from "expo-google-app-auth";
import { Video } from 'expo-av';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import { getDistance } from 'geolib';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';

var mapStyleNight = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];


var mapStyleDay = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

var config = {
  apiKey: "AIzaSyAlqq0ZEVE_aLDnAnUoxxqJw0WZyhrePbc",
  authDomain: "com.funosistemas.track",
  databaseURL: "https://my-project-1504184630350.firebaseio.com",
  projectId: "my-project-1504184630350",
  storageBucket: "my-project-1504184630350.appspot.com",
  messagingSenderId: "343448140833"
};


//firebase.initializeApp(config);

const CountVideoTotal = 50;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const user = null;
const type_id_get = 5;
const type_id_basquet = 10;

export default class App extends React.Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
    if (nextProps.total !== prevState.total) {
      console.log(nextProps);
      console.log(prevState);
      //return ({ total: nextProps.total }) // <- this is setState equivalent

    }
    console.log(nextProps);
    console.log(prevState);
    console.log("ok")
    //console.log(prevState);
    return null
  }

  constructor(props) {
    super(props);

    this.state = {
      autenthication: false,
      latitude: null,
      longitude: null,
      error: null,
      markers: [],
      data: [],
      gotGpsData: false,
      user_id: null,
      email: "",
      password: "",
      SignUpPress: false,
      play: false,
      CountVideo: 0,
      sourcevideo: null,
      score: 0,
      energy: 0,
      water: 0,
      humus: 0,
      basquet: null,
      id_marker_v1: 0,
      id_marker_v2: 0,
      id_marker_v3: 0,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    }
    this.handlePress = this.handlePress.bind(this);
    this.onPressMarker = this.onPressMarker.bind(this);
    this.playbackObject = null;

  }


  //SignUp = (email, password, signup) => {

  //  if (signup) {
  //    this.setState({ SignUpPress: true });
  //    this.render();
  //  }
  //  else {
  //    try {
  //      firebase
  //        .auth()
  //        .createUserWithEmailAndPassword(email, password)
  //        .then(user => {
  //          console.log(user);
  //        });
  //    } catch (error) {
  //      console.log(error.toString(error));
  //    }
  //  }
  //};


  //Login = (email, password) => {
  //  try {
  //    firebase
  //      .auth()
  //      .signInWithEmailAndPassword(email, password)
  //      .then(res => {
  //        console.log(res.user.email);
  //        this.setState({ SignUpPress: false });
  //        this.render();
  //      });
  //  } catch (error) {
  //    console.log(error.toString(error));
  //  }
  //};

  async loadFonts() {
    await Font.loadAsync({
      'Bangers-Regular': require('./assets/fonts/Bangers-Regular.ttf')
    })
    this.setState({ fontsLoaded: true });
  }

  async loginWithFaceBook() {

  }

  async loginWithGoogle() {
    try {
      //console.log(Platform.OS);
      //console.log(Expo.Constants.appOwnership);
      const result = await Google.logInAsync({
        androidClientId: Platform.OS === 'android' ? '343448140833-hp8ndep7gin18segoqiath1qttlk641t.apps.googleusercontent.com' : '343448140833-4o28d66k0t9ddcco1822030h5fbcass6.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === "success") {
        // Then you can use the Google REST API
        console.log('login google successfull');
        console.log(result.user);

        //this.setState({ showmarker: true });
        this.setState({ email: result.user.email });
        this.setState({ nome: result.user.name });

        this.insertuser(result.user.name, result.user.email);

        //navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log(error);
    }

  }


  handlePress(e) {

    if (this.state.energy <= 0) {
      alert('Nivel de Energia Insuficiente!!');
      return;
    }

    this.setState({ showmarker: null });
    this.setState({ showpoint: true });

    if (e != null) {
      this.setState({
        markerprop: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        }
      });
    }
    else {
      this.setState({
        markerprop: {
          latitude: this.state.initialPosition.latitude,
          longitude: this.state.initialPosition.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        }
      });
    }

    console.log(this.state.data);
    console.log(this.state.basquet);


    //this.setState({SignUpPress: true});
    //this.setState({
    //  markers: [
    //    ...this.state.markers,
    //    {
    //      coordinate: e.nativeEvent.coordinate,
    //      cost: "teste"
    //    }
    //  ]
    //});
  }


  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        this.setState({ play: false });
        this.setState({ CountVideo: 0 });
        console.log(playbackStatus.error);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        this.setState({ play: true });
        console.log('playing');
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        this.setState({ play: true });
        console.log('buffering');
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        this.setState({ play: false });
        this.setState({ CountVideo: 0 });
        this.playbackObject.unloadAsync();
        console.log('finished');
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }

    }
  };

  _handleVideoRef = component => {
    this.playbackObject = component;
    console.log('refering..');
  }

  animate(coordatual) {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude: coordatual.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude: coordatual.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
    };

    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }

  updateState(location) {

    var lat = parseFloat(location.coords.latitude)
    var lng = parseFloat(location.coords.longitude)

    var initialRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }

    this.setState({ initialPosition: initialRegion });

    //var lastPosition = JSON.stringify(position);		   
    this.setState({ gotGpsData: true });

    var LastDistance = 100000;
    var mVideo = null;
    //{
    // this.state.data.map(function (m, i) {

    //   var gpsDistance = getDistance(
    //     { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
    //     { latitude: m.latLong.latitude, longitude: m.latLong.longitude }
    //   );
    //   if (gpsDistance < LastDistance) {
    //     LastDistance = gpsDistance;
    //     mVideo = m.video;
    //   }

    // })
    // }

    this.setState({ sourcevideo: mVideo });

    /*if (!this.state.play)
    {				
      this.state.sourcevideo = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';				
    }*/

    this.setState({ CountVideo: this.state.CountVideo + 1 });
    console.log(this.state.CountVideo);
    console.log('video');
    console.log(this.state.sourcevideo);

  }//,
  //(error) => this.setState({ error: error.message }),
  //{  timeout: 20000, maximumAge: 1000 },
  //);

  _storeData = async (chave, valor) => {
    try {
      await AsyncStorage.setItem(chave, valor);
      console.log("Gravado");
      console.log(valor);
    } catch (error) {
      alert(error);
    }
  };


  async componentWillUnmount() {
    console.log("Unmount");
    rol();
  }
  async componentDidMount() {

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();//  requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      loc(this);

      this.setState({ nome: await AsyncStorage.getItem('nome') });
      this.setState({ user_id: await AsyncStorage.getItem('user_id') });
      this.setState({ score: await AsyncStorage.getItem('score') });
      this.setState({ energy: await AsyncStorage.getItem('energy') });
      this.setState({ water: await AsyncStorage.getItem('water') });
      this.setState({ humus: await AsyncStorage.getItem('humus') });

      if (this.state.user_id == null) {
        this.setState({ autenthication: true });
      } else { this.setState({ autenthication: false }); }

      console.log("user_id");
      console.log(this.state.user_id);

      let location = await Location.getCurrentPositionAsync({});
      //this.updateState(location);

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          //timeInterval: 5000,
          distanceInterval: 5,
          // distanceInterval: 0,  
        },
        (loc) => {
          this.updateState(loc);
          console.log(loc)
        }
      )
      console.log("fonts");
      await this.loadFonts();

      console.log(this.state.fontsLoaded);

      this.apiGetAll();
      this.getScore();


    } catch (error) {
      console.log(error);
    }


    //navigator.geolocation.getCurrentPosition(
    //  (position) => {


    //console.log(getDistance(
    //  { latitude: 51.5103, longitude: 7.49347 },
    //  { latitude: "51° 31' N", longitude: "7° 28' E" }
    //));
    /*this.initAsync();*/

  }

  //initAsync = async () => {
  //await GoogleSignIn.initAsync({ clientId: '343448140833-ihs7ennbut7q4hk24pgsrnh3fo2sf8tj.apps.googleusercontent.com'} );    
  //try {
  //console.log(Platform.OS);
  //console.log(Expo.Constants.appOwnership);
  //const result = await Google.logInAsync({
  //androidClientId: Platform.OS === 'android' ? '343448140833-hp8ndep7gin18segoqiath1qttlk641t.apps.googleusercontent.com' : '',
  //scopes: ['profile', 'email']
  //});


  //const { type, user } = await Google.logInAsync({
  //  iosClientId: '<YOUR_IOS_CLIENT_ID>',
  //  androidClientId: '343448140833-hp8ndep7gin18segoqiath1qttlk641t.apps.googleusercontent.com',
  //});

  //if (result.type  === "success") {
  // Then you can use the Google REST API
  //console.log(user);
  //navigation.navigate("Profile", { user });
  //}
  //} catch (error) {
  //  console.log("LoginScreen.js 19 | error with login", error);
  // }
  //};


  //_syncUserWithStateAsync = async () => {
  //  const user = await GoogleSignIn.signInSilentlyAsync();
  //  this.setState({ user });
  //};

  //signInAsync = async () => {
  //   try {
  //     await Google.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //     if (type === 'success') {
  //       alert(user);
  //       this._syncUserWithStateAsync();
  //     }
  //   } catch ({ message }) {
  //     alert('login: Error:' + message);
  //   }
  // };

  async getScore() {
    try {
      var link = `http://www.funosistemas.com.br/flylikebee/selectscore.php?user_id=${this.state.user_id}`;
      console.log(link);
      const resp = await fetch(link)
      var ret = await resp.json();

      console.log(ret);

      this.setState({ score: ret.s });
      this.setState({ water: ret.s1 });
      this.setState({ humus: ret.s2 });
      this.setState({ energy: ret.s3 });
      this.setState({ basquet: ret.b });

    } catch (err) {
      console.log("Erro");
      //this.setState({ data: JSON.parse("[{}]") });
      alert(err)

    }
  }

  async apiGetAll() {
    try {
      var link = 'http://www.funosistemas.com.br/flylikebee/locate4.php';
      if (this.state.initialPosition) {
        link = `http://www.funosistemas.com.br/flylikebee/locate4.php?lat=${this.state.initialPosition.latitude}&long=${this.state.initialPosition.longitude}`
      }
      console.log("Link");
      console.log(link);
      const resp = await fetch(link)
      var data = await resp.json()
      this.setState({ data: JSON.parse(JSON.stringify(data)) });
      return resp
    } catch (err) {
      console.log("Erro");
      //this.setState({ data: JSON.parse("[{}]") });
      alert(err)

    }
  }

  storeDataGet = async (chave) => {
    try {
      const value = await AsyncStorage.getItem(chave)
      if (value !== null) {
        var ret = JSON.parse(value)
        console.log("Lendo");
        console.log(ret);
        this.setState({ user_id: `${value}` });
      }
    } catch (e) {
      alert(e)
      // error reading value
    }
  }

  async insertuser(nome, email) {
    try {
      const link = `http://www.funosistemas.com.br/flylikebee/insertuserphp.php?name=${encodeURI(nome)}&email=${encodeURI(email)}`;
      console.log(link);
      const resp = await fetch(link)
      var ret = await resp.text();
      console.log(ret);
      this._storeData('nome', JSON.stringify(nome));
      this._storeData('user_id', JSON.stringify(ret));
      this._storeData('score', JSON.stringify(0));
      this._storeData('energy', JSON.stringify(0));
      this._storeData('water', JSON.stringify(0));
      this._storeData('humus', JSON.stringify(0));

      console.log('nome');
      console.log(this.state.nome);
      //var data = await resp.body();//  .json()
      //return resp
    } catch (err) {
      alert(err)
    }
  }


  async insertrec(lat, long, user_id, type_id) {
    try {

      this.seed.play();

      const link = `http://www.funosistemas.com.br/flylikebee/insertphp.php?latitude=${lat}&longitude=${long}&user_id=${this.state.user_id}&type_id=${type_id}`;
      console.log(link);
      const resp = await fetch(link)
      var ret = await resp.json()
      console.log(ret);
      this.state.data.push(JSON.parse(JSON.stringify(ret.tracker)));

      this.setState({ score: ret.score.s });
      this.setState({ water: ret.score.s1 });
      this.setState({ humus: ret.score.s2 });
      this.setState({ energy: ret.score.s3 });


      this.setState({ showmarker: true });
      this.setState({ showpoint: null });
      //this.apiGetAll();

      this.setState({
        markerprop: {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        }
      });
      this.setState({ id_marker: ret.tracker.key });
      this.setState({ id_marker_v1: ret.tracker.v1 });
      this.setState({ id_marker_v2: ret.tracker.v2 });
      this.setState({ id_marker_v3: ret.tracker.v3 });
      this.setState({ type_id: type_id });

      //var data = await resp.body();//  .json()
      //return resp
    } catch (err) {
      alert(err)
    }
  }



  //getGpsData(){

  //navigator.geolocation.watchPosition(
  // (position) => {

  onRegionChangeComplete = (region) => {

    /*this.apiGetAll();*/

    var lat = parseFloat(region.latitude)
    var lng = parseFloat(region.longitude)

    this.setState({
      markerprop: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
      }
    });


    //var initialRegion = {
    //  latitude: lat,
    //  longitude: lng,
    //  latitudeDelta: 0.001,
    //  longitudeDelta: 0.001
    //}



    //this.setState({ initialPosition: initialRegion })

    //var lastPosition = JSON.stringify(position);		   
    this.setState({ gotGpsData: true });

    //var LastDistance = 100000;
    //var mVideo = null;
    //{
    //  this.state.data.map(function (m, i) {

    //    var gpsDistance = getDistance(
    //      { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
    //      { latitude: m.latLong.latitude, longitude: m.latLong.longitude }
    //    );
    //    if (gpsDistance < LastDistance) {
    //      LastDistance = gpsDistance;
    //      mVideo = m.video;
    //    }

    //  })
    //}

    //this.setState({ sourcevideo: mVideo });

    /*if (!this.state.play)
    {				
      this.state.sourcevideo = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';				
    }*/

    this.setState({ CountVideo: this.state.CountVideo + 1 });
    console.log(this.state.CountVideo);
    console.log('video');
    console.log(this.state.sourcevideo);
    //this.render();
  }//,
  //(error) => {},
  //{ timeout: 20000, maximumAge: 0 ,distanceFilter: 1 , enableHighAccuracy: true}
  //);

  //}

  home() {

    this.setState({ showmarker: null });
    this.setState({ showpoint: null });

  }


  onPressMarker(e, key) {

    //const newCoordinate = {
    //  latitude: key.nativeEvent.coordinate.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
    //  longitude: key.nativeEvent.coordinate.latitudelongitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
    //};

    //if (Platform.OS === 'android') {
    //  if (this.marker) {
    //    this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    //  }
    //} else {
    //  coordinate.timing(newCoordinate).start();
    //}

    //if (this.state.showmarker) {
    //  if (this.state.markerprop.latitude == key.nativeEvent.coordinate.latitude && this.state.markerprop.longitude == key.nativeEvent.coordinate.longitude) {
    //    this.setState({ showmarker: false });
    //  }
    //}
    //else {
    this.setState({ showmarker: true });
    //}

    this.setState({
      markerprop: {
        latitude: key.nativeEvent.coordinate.latitude,
        longitude: key.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
      }
    });

    this.setState({ rain: null })
    this.setState({ id_marker: e.key });
    this.setState({ id_marker_v1: e.v1 });
    this.setState({ id_marker_v2: e.v2 });
    this.setState({ id_marker_v3: e.v3 });
    this.setState({ type_id: e.t });

    //this.map.animateToRegion(this.state.markerprop, 1);
    //if (this.rain) { this.rain.stop(); }

    //this.setState({selectedMarkerIndex: index});	
    //console.log(this.state.markerprop.latLong);
  }

  videoStart(video) {

    this.setState({ sourcevideo: video });
    this.setState({ showmarker: null });
    this.setState({ CountVideo: CountVideoTotal });

  }

  _getdistance(lat_origem, long_origem, lat_destino, long_destino) {

    var GpsDistance = getDistance(
      { latitude: lat_origem, longitude: long_origem },
      { latitude: lat_destino, longitude: long_destino }
    );

    /*if (GpsDistance < this.state.Distance){
      this.setState({Distance: GpsDistance});	
      this.setState({sourcevideo: urlVideo});	
    }*/

    return (GpsDistance);
  }

  render() {

    //return this.ShowVazio();
    if (this.state.autenthication) {
      if (this.state.fontsLoaded) {
        return this.ShowLogin();
      }
      else {
        return <AppLoading />;
      }
    }

    if (this.state.showmarker) {
      return this.ShowMarker();
    }

    if (this.state.showpoint) {
      return this.ShowPoint();
    }

    if (this.state.SignUpPress) {
      return this.renderSignup();
    }

    if (!this.state.gotGpsData) {
      //this.getGpsData();
      return this.renderLoadingView();
    }

    if (this.state.data.length == 0) {
      return this.ShowVazio();
    }

    if (!this.state.play && this.state.CountVideo < CountVideoTotal) {
      return this.SemVideo();
    }

    if (this.state.sourcevideo == null) {
      return this.SemVideo();
    }



    return (
      <View style={styles.container}>

        <MapView //onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          initialRegion={this.state.initialPosition}
          region={this.state.initialPosition}
          onPress={this.handlePress}
          /*customMapStyle={mapStyleDay}*/
          //provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}
          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}
        //mapType= {'standard'}

        >

          {this.state.data.map((m, i) =>
            <MapView.Marker
              coordinate={m.latLong}
              //title={this._getdistance(m.latLong.latitude, m.latLong.longitude).toString()}              
              //description={m.description}
              title={m.title}
              description={m.ni}
              key={m.key}
              //image={markerImages[m.image]}
              image={source = { uri: 'http://www.funosistemas.com.br/flylikebee/img/' + m.image }}
              style={{ width: 140, height: 140 }}
              onPress={this.onPressMarker.bind(this, m)}

            />
          )
          }

          {//!!this.state.initialPosition && <MapView.Marker
            // coordinate={{ "latitude": this.state.initialPosition.latitude, "longitude": this.state.initialPosition.longitude }}
            // title={this.state.initialPosition.latitude.toString() + "..."}
            // image={require('assets/images/bee.png')} style={{ width: 40, height: 40 }}
            ///>
          }


        </MapView>


        <View style={styles.bottomView} >
          <Video
            ref={this._handleVideoRef}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            source={{ uri: 'http://www.funosistemas.com.br/flylikebee/video/rt.php?name=' + this.state.sourcevideo }}
            /*source={require('./videos/asthma-1.mp4')} //local video*/
            /*source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}*/
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            style={{ width: 300, height: 300 }}
          />
        </View>

      </View>
    )
  }

  async water(prop) {

    try {

      if (this.state.energy <= 0) {
        alert('Nivel de Energia Insuficiente!!');
        return;
      }

      if (this.state.type_id == type_id_get) {
        if (this.state.id_marker_v1 <= 0) {
          alert('Nivel de agua Insuficiente!!');
          return;
        }
      }
      else {
        if (this.state.water <= 0) {
          alert('Nivel de agua Insuficiente!!');
          return;
        }
      }

      this.rain.play();

      const link = `http://www.funosistemas.com.br/flylikebee/insertwater.php?user_id=${this.state.user_id}&id=${this.state.id_marker}`;
      console.log(link);
      const resp = await fetch(link)
      var ret = await resp.json()

      console.log(ret);

      let index = this.state.data.findIndex(el => el.key === this.state.id_marker);
      this.state.data[index] = { ...this.state.data[index], v1: ret.v1, image: ret.image , t: ret.t};

      this.setState({ rain: true });
      this.setState({ score: ret.s });
      this.setState({ water: ret.s1 });
      this.setState({ humus: ret.s2 });
      this.setState({ energy: ret.s3 });
      this.setState({ id_marker_v1: ret.v1 })
      this.setState({ id_marker_v2: ret.v2 })
      this.setState({ id_marker_v3: ret.v3 })
      this.setState({ type_id: ret.t });
      //this.setState({ showpoint: null });
      //this.apiGetAll();

      //var data = await resp.body();//  .json()
      //return resp
    } catch (err) {
      alert(err)
    }


  }

  async humus(prop) {
    try {
      if (this.state.energy <= 0) {
        alert('Nivel de Energia Insuficiente!!');
        return;
      }

      if (this.state.type_id == type_id_get) {
        if (this.state.id_marker_v2 <= 0) {
          alert('Nivel de Humus Insuficiente!!');
          return;
        }
      }
      else {
        if (this.state.humus < 0) {
          alert('Nivel de Humus Insuficiente!!');
          return;
        }
      }

      this.rain.source = require('./assets/images/humus.json');
      this.rain.play();

      const link = `http://www.funosistemas.com.br/flylikebee/inserthumus.php?user_id=${this.state.user_id}&id=${this.state.id_marker}`;
      const resp = await fetch(link)
      var ret = await resp.json()

      let index = this.state.data.findIndex(el => el.key === this.state.id_marker);
      this.state.data[index] = { ...this.state.data[index], v2: ret.v2, image: ret.image , t: ret.t};


      this.setState({ rain: true });
      this.setState({ score: ret.s });
      this.setState({ water: ret.s1 });
      this.setState({ humus: ret.s2 });
      this.setState({ energy: ret.s3 });
      this.setState({ id_marker_v1: ret.v1 })
      this.setState({ id_marker_v2: ret.v2 })
      this.setState({ id_marker_v3: ret.v3 })
      this.setState({ type_id: ret.t });


      console.log(link);
      console.log(ret);
      //this.setState({ showmarker: null });
      //this.setState({ showpoint: null });
      //this.apiGetAll();
      //var data = await resp.body();//  .json()
      //return resp
    } catch (err) {
      alert(err)
    }

  }

  async energy(prop) {
    try {


      if (this.state.type_id == type_id_basquet) {

        if (this.state.energy <= 0) {
          alert('Nivel de Energia Insuficiente!!');
          return;
        }

        this.rain.play();
  
        const link = `http://www.funosistemas.com.br/flylikebee/insertbasquet.php?user_id=${this.state.user_id}&id=${this.state.id_marker}`;
        console.log(link);  

        const resp = await fetch(link);
        var ret = await resp.json();

        let index = this.state.data.findIndex(el => el.key === this.state.id_marker);

        this.state.data.splice(index,1);

        this.setState({ basquet: ret.b });

      }
      else{

        if (this.state.id_marker_v3 <= 0) {
          alert('Nivel de energia Insuficiente!!');
          return;
        }

        this.rain.play();

        const link = `http://www.funosistemas.com.br/flylikebee/insertenergia.php?user_id=${this.state.user_id}&id=${this.state.id_marker}`;
        console.log(link);
  
        const resp = await fetch(link);
        var ret = await resp.json();
  
        let index = this.state.data.findIndex(el => el.key === this.state.id_marker);
        this.state.data[index] = { ...this.state.data[index], v2: ret.v2 }; 

        this.setState({ rain: true });
        this.setState({ score: ret.s });
        this.setState({ water: ret.s1 });
        this.setState({ humus: ret.s2 });
        this.setState({ energy: ret.s3 });
        this.setState({ id_marker_v1: ret.v1 })
        this.setState({ id_marker_v2: ret.v2 })
        this.setState({ id_marker_v3: ret.v3 })
  
      }

      console.log(ret);
      //this.setState({ showmarker: null });
      //this.setState({ showpoint: null });
      //this.apiGetAll();
      //var data = await resp.body();//  .json()
      //return resp
    } catch (err) {
      alert(err)
    }

  }


  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ProgressBarAndroid />
        <Text style={styles.instructions}>
          Receiving GPS information...
       </Text>
      </View>
    );
  }

  renderSignup() {
    return (
      <View style={styles.login}>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={password => this.setState({ password })}
          />
        </Item>
        <Button full rounded success style={{ marginTop: 20 }} onPress={() => this.Login(this.state.email, this.state.password)}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }

  ShowLogin() {

    return (
      <View>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Olá!! Eu sou a Bel, a Abelha Rainha!! Seja bem vindo no nosso Jardim!!!</Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Vou te orientar e dar suporte no nosso mundo.</Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Colete as sementes que aparecerão e plante-as no mapa. Elas germinaram e crescerão atraindo outras abelhas. </Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Não deixa-as morrerem. Ela precisam de água e humus para sobreviver. Quando começarem a florir vai liberar néctar </Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Esse Néctar servirá de energia para todas as abelhas. Ganhe muitos pontos quando outras abelhas vierem pegar o Néctar</Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>A cada mil pontos ou quando você menos esperar , vou aparecer trazendo muitas novidades ou para mudanças de ciclo</Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>A cada novo ciclo, novas sementes aparecerão com muitas novidades.</Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Não perca tempo. Comece agora se cadastrando abaixo. </Text>
        <Text style={{ fontFamily: 'Bangers-Regular', fontSize: 20 }}>Vamos florir o nosso planeta!!!</Text>
        <LottieView
          source={require('./assets/images/beewelcome2.json')}
          autoPlay
          loop
        />
        <FontAwesome.Button name="google" backgroundColor="red" onPress={this.loginWithGoogle.bind(this)}>
          Login with Google
      </FontAwesome.Button>

        <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFaceBook.bind(this)}>
          Login with Facebook
      </FontAwesome.Button>
      </View>
    );

  }

  ShowMarker() {

    var imageButtonWater = this.state.type_id == type_id_get ? require("./assets/images/get-water.png") : require("./assets/images/water.png");
    var imageButtonHumus = this.state.type_id == type_id_get ? require("./assets/images/get-humus.png") : require("./assets/images/humus.png");
    var imageButtonEnergy = this.state.type_id == type_id_basquet ? require("./assets/images/basquet.png") : require("./assets/images/energy.png");

    return (
      <View style={styles.container}>

        <MapView //onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          //initialRegion = {e.nativeEvent.coords}
          region={this.state.markerprop}
          //onPress={this.handlePress}
          /*customMapStyle={mapStyleDay}*/
          //provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}
          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}
          ref={ref => this.map = ref}
        //mapType= {'standard'}

        >

          {this.state.data.map((m, i) => {
            if (this._getdistance(this.state.markerprop.latitude, this.state.markerprop.longitude, m.latLong.latitude, m.latLong.longitude) < 500) {
              return (
                <MapView.Marker
                  coordinate={m.latLong}
                  //title={this._getdistance(m.latLong.latitude, m.latLong.longitude).toString()}
                  //description={m.description}
                  title={m.title}
                  description={m.ni}
                  key={m.key}
                  //image={markerImages[m.image]}
                  image={source = { uri: 'http://www.funosistemas.com.br/flylikebee/img/' + m.image }}
                  style={{ width: 140, height: 140 }}
                  onPress={this.onPressMarker.bind(this, m)}

                />)
            }
          }
          )

          }

          {/*!!this.state.initialPosition && <MapView.Marker
            coordinate={{ "latitude": this.state.initialPosition.latitude, "longitude": this.state.initialPosition.longitude }}
            title={this.state.initialPosition.latitude.toString() + "..."}
            image={require('../assets/images/bee.png')} style={{ width: 40, height: 40 }}
          />*/}


        </MapView>

        <View pointerEvents="none" style={{
          position: 'absolute',
          flex: 5,
          backgroundColor: "transparent",
          height: '50%',
          width: wp('100%'),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }} >
          <LottieView
            source={require('./assets/images/bee-flying.json')}
            colorFilters={[{
              keypath: "button",
              color: "#F00000"
            }, {
              keypath: "Sending Loader",
              color: "#F00000"
            }]}
            autoPlay
            loop
          />
          <LottieView
            ref={animation => { this.rain = animation; }}
            source={require('./assets/images/rain.json')}
            style={{ width: '100%', height: '100%' }}
            duration={4000}
            colorFilters={[{
              keypath: "button",
              color: "#F00000"
            }, {
              keypath: "Sending Loader",
              color: "#F00000"
            }]}
            autoPlay={false}
            loop={false}
          />


        </View>

        <View pointerEvents="none" style={{ backgroundColor: 'transparent', flex: 0.9, flexDirection: 'row', justifyContent: 'center', width: wp('100%') }}>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Score</Text><Progress.Bar progress={Number(this.state.score) / 1000} width={wp('20%')} color="blue" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Energy</Text><Progress.Bar progress={Number(this.state.energy) / 100} width={wp('20%')} color="orange" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Water</Text><Progress.Bar progress={Number(this.state.water) / 100} width={wp('20%')} color="green" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Hummus</Text><Progress.Bar progress={Number(this.state.humus) / 100} width={wp('20%')} color="brown" /></View>
        </View>

        <View pointerEvents="none" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Progress.Bar progress={Number(this.state.id_marker_v1) / 100} width={wp('25%')} color="green" />
          <Progress.Bar progress={Number(this.state.id_marker_v2) / 100} width={wp('25%')} color="brown" />
          <Progress.Bar progress={Number(this.state.id_marker_v3) / 100} width={wp('25%')} color="orange" />
        </View>

        <View pointerEvents="auto" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.water(this.state.markerprop)}>
            <ImageBackground source={imageButtonWater} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.humus(this.state.markerprop)}>
            <ImageBackground source={imageButtonHumus} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.energy(this.state.markerprop)}>
            <ImageBackground source={imageButtonEnergy} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.home()}>
            <ImageBackground source={require("./assets/images/beehome.png")} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>

        </View>

      </View >
    )
  }

  ShowRain() {

    return (
      <View style={styles.container}>

        <MapView //onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          //initialRegion = {e.nativeEvent.coords}
          region={this.state.markerprop}
          //onPress={this.handlePress}
          /*customMapStyle={mapStyleDay}*/
          //provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}
          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}
          ref={ref => this.map = ref}
        //mapType= {'standard'}

        >

          {this.state.data.map((m, i) =>
            <MapView.Marker
              coordinate={m.latLong}
              //title={this._getdistance(m.latLong.latitude, m.latLong.longitude).toString()}
              //description={m.description}
              //title={'Agua:' + m.v1}
              //description={'Humus:' + m.v2}
              key={m.key}
              //image={markerImages[m.image]}
              image={source = { uri: 'http://www.funosistemas.com.br/flylikebee/img/' + m.image }}
              style={{ width: 140, height: 140 }}
              onPress={this.onPressMarker.bind(this, m)}

            />
          )
          }

          {/*!!this.state.initialPosition && <MapView.Marker
            coordinate={{ "latitude": this.state.initialPosition.latitude, "longitude": this.state.initialPosition.longitude }}
            title={this.state.initialPosition.latitude.toString() + "..."}
            image={require('../assets/images/bee.png')} style={{ width: 40, height: 40 }}
          />*/}


        </MapView>
        <View pointerEvents="none" style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 50, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Score   {this.state.score}</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Energy  {this.state.energy}%</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Water   {this.state.water}%</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Hummus  {this.state.humus}%</Text></View>
        </View>


        <View pointerEvents="none" style={{
          position: 'absolute',
          flex: 0.3,
          flexDirection: 'row',
          backgroundColor: "transparent",
          height: '50%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <LottieView
            source={require('./assets/images/rain.json')}
            style={{ width: '100%', height: '100%' }}
            colorFilters={[{
              keypath: "button",
              color: "#F00000"
            }, {
              keypath: "Sending Loader",
              color: "#F00000"
            }]}
            autoPlay
          />

        </View>

        <View pointerEvents="auto" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.water(this.state.markerprop)}>
            <ImageBackground source={require("./assets/images/water.png")} style={{ width: 20, height: 20 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.humus(this.state.markerprop)}>
            <ImageBackground source={require("./assets/images/humus.png")} style={{ width: 20, height: 20 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.home()}>
            <ImageBackground source={require("./assets/images/beehome.png")} style={{ width: 20, height: 20 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>

        </View>


      </View >
    )
  }


  ShowPoint() {

    return (
      <View style={styles.container}>

        <MapView onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          //initialRegion = {this.state.markerprop.latLong}
          region={this.state.markerprop}
          onPress={this.handlePress}
          /*customMapStyle={mapStyleDay}*/
          //provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}
          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}
          ref={ref => this.map = ref}

        //mapType= {'standard'}

        >

          {this.state.data.map((m, i) => {
            if (this._getdistance(this.state.markerprop.latitude, this.state.markerprop.longitude, m.latLong.latitude, m.latLong.longitude) < 500) {
              return (
                <MapView.Marker
                  coordinate={m.latLong}
                  //title={this._getdistance(m.latLong.latitude, m.latLong.longitude).toString()}
                  //description={m.description}
                  title={m.title}
                  description={m.ni}
                  key={m.key}
                  //image={markerImages[m.image]}
                  image={source = { uri: 'http://www.funosistemas.com.br/flylikebee/img/' + m.image }}
                  style={{ width: 140, height: 140 }}
                  onPress={this.onPressMarker.bind(this, m)}

                />)
            }
          }
          )
          }


          <MapView.Marker
            coordinate={{ "latitude": this.state.markerprop.latitude, "longitude": this.state.markerprop.longitude }}
            //title={this.state.initialPosition.latitude.toString() + "..."}
            image={require('./assets/images/pa.png')}
            style={{ width: 80, height: 80 }}
          >
          </MapView.Marker>

        </MapView>

        <View pointerEvents="none" style={{
          position: 'absolute',
          flex: 0.3,
          backgroundColor: "transparent",
          height: '50%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <LottieView
            ref={animation => { this.seed = animation; }}
            source={require('./assets/images/seed.json')}
            autoPlay={false}
            loop
          />


        </View>
        <View pointerEvents="none" style={{ backgroundColor: 'transparent', flex: 0.9, flexDirection: 'row', justifyContent: 'center', width: wp('100%') }}>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Score</Text><Progress.Bar progress={Number(this.state.score) / 1000} width={wp('20%')} color="blue" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Energy</Text><Progress.Bar progress={Number(this.state.energy) / 100} width={wp('20%')} color="orange" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Water</Text><Progress.Bar progress={Number(this.state.water) / 100} width={wp('20%')} color="green" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Hummus</Text><Progress.Bar progress={Number(this.state.humus) / 100} width={wp('20%')} color="brown" /></View>
        </View>


        <View pointerEvents="auto" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, this.state.user_id, 10)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/semente.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, this.state.user_id, 5)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/cactus.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, this.state.user_id, 7)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/girasol.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, 1, 6)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/hibisco.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, 1, 3)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/margarida.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.insertrec(this.state.markerprop.latitude, this.state.markerprop.longitude, 1, 4)}>
            <ImageBackground source={{ uri: 'http://www.funosistemas.com.br/flylikebee/img/lotus.png' }} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>

        </View>

      </View>
    )
  }


  ShowVazio() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialPosition}
          region={this.state.initialPosition}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}

          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}

        >
        </MapView>

        <View pointerEvents="none" style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 50, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Score   {this.state.score}</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Energy  {this.state.energy}%</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Water   {this.state.water}%</Text></View>
          <View style={{ width: 60, height: 50, backgroundColor: 'transparent' }}><Text style={{ fontWeight: 'bold' }}>Hummus  {this.state.humus}%</Text></View>
        </View>
        <View pointerEvents="none" style={{
          position: 'absolute',
          flex: 0.3,
          backgroundColor: "transparent",
          height: '50%',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <LottieView
            source={require('./assets/images/plant.json')}
            colorFilters={[{
              keypath: "button",
              color: "#F00000"
            }, {
              keypath: "Sending Loader",
              color: "#F00000"
            }]}
            autoPlay
            loop
          />
        </View>
      </View >
    );

  }



  SemVideo() {

    return (
      <View style={styles.container}>
        <MapView
          //onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          initialRegion={this.state.initialPosition}
          region={this.state.initialPosition}
          //onPress={this.handlePress.bind(this)}
          /*customMapStyle={mapStyleDay}*/
          //provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]}

          followsUserLocation={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsBuildings={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          showsCompass={false}
          showsIndoorLevelPicker={false}
          ref={ref => this.map = ref}
        //mapType= {'standard'}


        >

          {this.state.data.map((m, i) => {
            if (this._getdistance(this.state.initialPosition.latitude, this.state.initialPosition.longitude, m.latLong.latitude, m.latLong.longitude) < 2000) {
              return (<MapView.Marker
                coordinate={m.latLong}
                tracksViewChanges={false}
                //title={this._getdistance(m.latLong.latitude, m.latLong.longitude).toString()}
                //description={m.description}
                title={m.title}
                description={m.ni}
                key={m.key}
                //image={markerImages[m.image]}
                image={source = { uri: 'http://www.funosistemas.com.br/flylikebee/img/' + m.image }}
                style={{ width: 140, height: 140 }}
                onPress={this.onPressMarker.bind(this, m)}

              />)
            }
          }
          )
          }

          { /*{ !!this.state.data && <Geojson geojson={this.state.data} />}*/}

          {/*!!this.state.initialPosition && <MapView.Marker
            coordinate={{ "latitude": this.state.initialPosition.latitude, "longitude": this.state.initialPosition.longitude }}
            title={this.state.initialPosition.latitude.toString() + "..."}
            image={require('../assets/images/bee.png')} style={{ width: 40, height: 40 }}
          />*/}

        </MapView>
        <View pointerEvents="none" style={{ backgroundColor: 'transparent', flex: 0.9, flexDirection: 'row', justifyContent: 'center', width: wp('100%') }}>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Score</Text><Progress.Bar progress={Number(this.state.score) / 1000} width={wp('20%')} color="blue" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Energy</Text><Progress.Bar progress={Number(this.state.energy) / 100} width={wp('20%')} color="orange" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Water</Text><Progress.Bar progress={Number(this.state.water) / 100} width={wp('20%')} color="green" /></View>
          <View style={{ width: wp('20%'), height: hp(50) }}><Text style={{ fontFamily: 'Bangers-Regular', fontSize: 14 }}>Hummus</Text><Progress.Bar progress={Number(this.state.humus) / 100} width={wp('20%')} color="brown" /></View>
        </View>
        <View pointerEvents="none" style={{
          position: 'absolute',
          flex: 0.3,
          backgroundColor: "transparent",
          height: '50%',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <LottieView
            source={require('./assets/images/plant.json')}
            colorFilters={[{
              keypath: "button",
              color: "#F00000"
            }, {
              keypath: "Sending Loader",
              color: "#F00000"
            }]}
            autoPlay
            loop
          />
        </View>

        <View pointerEvents="auto" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.handlePress(null)}>
            <ImageBackground source={require("./assets/images/pa.png")} style={{ width: 30, height: 30 }}>
              <Text></Text>
            </ImageBackground>
          </TouchableOpacity>

        </View>

      </View >
    );

  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  bottomView: {

    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  login: {
    top: 100,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  markers: {
    position: 'absolute',
    flex: 0.3,
    backgroundColor: "white",
    borderColor: "yellow",
    borderWidth: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  textStyle: {
    color: '#fff',
    fontSize: 22
  },
  progressbar: {
    flex: 1,
    flexDirection: 'column',
    width: "4%",
    height: "4%",
    padding: 3,
    borderColor: "#FAA",
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 200,
    justifyContent: "flex-start",
  },
  inner: {
    width: "10%",
    height: 5,
    borderRadius: 15,
    backgroundColor: "green",
  },
  label: {
    fontSize: 23,
    color: "black",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  }
});
