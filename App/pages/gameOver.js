import React, {Component} from 'react'
import {Text, TextInput, KeyboardAvoidingView, View,StyleSheet, Button, TouchableOpacity, Image} from 'react-native'
import constants from '../gameSettings/constants'
import ButtonRestart from '../assets/btn-restart.png'
import ButtonHome from '../assets/btn-home.png'
import AsyncStorage from '@react-native-community/async-storage'

export default class GameOver extends Component {
  constructor(props){
    super(props)
    this.state={
      localScore:0
    }
    this.getLocalScore = this.getLocalScore.bind(this)
  }

  getLocalScore = async () => {
    try {
      console.log('localStore')
      const value = await AsyncStorage.getItem('localHigschore')
      if(value !== null) {
        // value previously stored
        this.setState({
          localScore:Number(value)
        })
      }
    } catch(e) {
      // error reading value
      console.log('error gameover' , e)
    }
  }

  componentDidMount(){
    this.getLocalScore()
  }


  render(){
    return(
      <KeyboardAvoidingView style={styles.container} >
          <View style={styles.info}>
            <View style={{alignItems:"center"}}>
              <Text style={styles.textCat}>Score</Text>
              <Text style={styles.score}>{this.props.score}</Text>
              <Text style={styles.textCat}>Your Best</Text>
              <Text style={styles.score}>{this.state.localScore}</Text>
            </View>
          </View>
        
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{marginRight:10}} onPress={()=> this.props.restartGame()}>
            <Image source={ButtonRestart} resizeMode="stretch"  style={{width:100, height:38}}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}} onPress={()=> this.props.renderHome()}>
            <Image  source={ButtonHome} resizeMode="stretch"  style={{width:100, height:38}}></Image>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    width:constants.MAX_WIDTH,
    height:constants.MAX_HEIGHT,
    alignItems:'center',
    justifyContent:"center"
  },
  textCat:{
    fontSize:20,
    fontFamily:"pixelboy"
  },
  score:{
    fontFamily:"pixelboy",
    fontSize:45,
    color:"#df7126",
  },
  info:{
    width:150,
    height:170,
    backgroundColor:"rgba(255,255,255,0.5)",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:30,
    borderColor:"black",
    borderBottomWidth:4,
    borderLeftWidth:4,
    borderRightWidth:4,
    borderTopWidth:4,
    borderRadius:20
  }
})