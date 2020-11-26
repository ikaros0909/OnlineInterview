import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Header, ButtonGroup, Card } from "react-native-elements";
import CustomButton from './CustomButton';

class UnivListPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
        <View style={styles.container}>
            <Header
                backgroundImageStyle={{}}
                barStyle="dark-content"
                centerComponent={{
                    text: "2021학년도 대학교 원서접수",
                    style: { color: "#fff", fontSize:20 }
                }}
                centerContainerStyle={{}}
                // containerStyle={{ width: 350 }}
                leftComponent={{ icon: "menu", color: "#fff" }}
                leftContainerStyle={{}}
                // linearGradientProps={[]}
                placement="center"
                rightComponent={{ icon: "home", color: "#fff" }}
                rightContainerStyle={{}}
                statusBarProps={{}}
            />
            <View style={styles.content}>
                <Image
                source={require("../../assets/images/flowers.png")}
                resizeMode="cover"
                style={styles.backdrop}
                />
                <View style={styles.elem}>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                        <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        source={require("../../assets/logo/1108.gif")}
                        />
                        <Card.Divider />
                        <View
                            style={{
                            position: "relative",
                            alignItems: "center"
                            }}
                        >
                        </View>
                        <View style={styles.applyInfo}>
                            <View style={styles.QRPrint}>
                                <CustomButton 
                                    buttonColor={'#023e71'}
                                    title={'수험표'}
                                    onPress={() => alert('QR코드 보여주기')}/>
                            </View>
                            <View>
                                <View style={styles.applySelMajor}>
                                    <Text style={styles.applySelMajorText}>IT특기자전형</Text>
                                    <Text style={styles.applySelMajorText}> &gt; </Text>
                                    <Text style={styles.applySelMajorText}>컴퓨터공학과</Text>
                                </View>
                                <Text style={styles.SuhumNo}>BOAA10001</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={styles.elem}>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                        <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        source={require("../../assets/logo/1003.gif")}
                        />
                        <Card.Divider />
                        <View
                            style={{
                            position: "relative",
                            alignItems: "center"
                            }}
                        >
                        </View>
                        <View style={styles.applyInfo}>
                            <View style={styles.QRPrint}>
                                <CustomButton 
                                    buttonColor={'#023e71'}
                                    title={'수험표'}
                                    onPress={() => alert('QR코드 보여주기')}/>
                            </View>
                            <View>
                                <View style={styles.applySelMajor}>
                                    <Text style={styles.applySelMajorText}>IT특기자전형</Text>
                                    <Text style={styles.applySelMajorText}> &gt; </Text>
                                    <Text style={styles.applySelMajorText}>컴퓨터공학과</Text>
                                </View>
                                <Text style={styles.SuhumNo}>BOAA10001</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={styles.elem}>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                        <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        source={require("../../assets/logo/1025.gif")}
                        />
                        <Card.Divider />
                        <View
                            style={{
                            position: "relative",
                            alignItems: "center"
                            }}
                        >
                        </View>
                        <View style={styles.applyInfo}>
                            <View style={styles.QRPrint}>
                                <CustomButton 
                                    buttonColor={'#023e71'}
                                    title={'수험표'}
                                    onPress={() => alert('QR코드 보여주기')}/>
                            </View>
                            <View>
                                <View style={styles.applySelMajor}>
                                    <Text style={styles.applySelMajorText}>IT특기자전형</Text>
                                    <Text style={styles.applySelMajorText}> &gt; </Text>
                                    <Text style={styles.applySelMajorText}>컴퓨터공학과</Text>
                                </View>
                                <Text style={styles.SuhumNo}>BOAA10001</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={styles.elem}>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                        <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        source={require("../../assets/logo/1042.gif")}
                        />
                        <Card.Divider />
                        <View
                            style={{
                            position: "relative",
                            alignItems: "center"
                            }}
                        >
                        </View>
                        <View style={styles.applyInfo}>
                            <View style={styles.QRPrint}>
                                <CustomButton 
                                    buttonColor={'#023e71'}
                                    title={'수험표'}
                                    onPress={() => alert('QR코드 보여주기')}/>
                            </View>
                            <View>
                                <View style={styles.applySelMajor}>
                                    <Text style={styles.applySelMajorText}>IT특기자전형</Text>
                                    <Text style={styles.applySelMajorText}> &gt; </Text>
                                    <Text style={styles.applySelMajorText}>컴퓨터공학과</Text>
                                </View>
                                <Text style={styles.SuhumNo}>BOAA10001</Text>
                            </View>
                        </View>
                    </Card>
                </View>

          {/* <View style={styles.elem}>
            <View style={styles.applyInfo}>
            <View style={styles.UnivLogo}>
              <Image
                source={require("../../assets/logo/1003.png")}
                resizeMode="cover"
                />
              </View>
              <View>
                <View style={styles.applySelMajor}>
                <Text style={styles.applySelMajorText}>학생부종합전형</Text>
                <Text style={styles.applySelMajorText}> &gt; </Text>
                <Text style={styles.applySelMajorText}>컴퓨터공학과</Text>
                </View>
                <Text style={styles.SuhumNo}>BOAA10002</Text>
              </View>
            </View>
            <View style={styles.QRPrint}>
              <CustomButton 
                buttonColor={'#023e71'}
                title={'수험표'}
                onPress={() => alert('QR코드 보여주기')}/>
            </View>
          </View> */}

        </View>
        <View style={styles.footer}>
            <ButtonGroup
                buttonStyle={{ width: 100 }}
                buttonContainerStyle={{}}
                buttons={[
                    "전자수험표",
                    "모의면접",
                    "비대면면접",
                    "합격자발표"
                ]}
                containerStyle={{}}
                // disabled={[3, 4]}
                disabledStyle={{}}
                disabledTextStyle={{}}
                disabledSelectedStyle={{}}
                disabledSelectedTextStyle={{}}
                innerBorderStyle={{}}
                onPress={() => console.log("onPress()")}
                selectedButtonStyle={{}}
                // selectedIndex={1}
                selectedIndexes={[0, 1, 2, 3]}
                selectedTextStyle={{}}
                textStyle={{}}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      padding: 1
    },
    // header: {
    //   height:60,
    //   backgroundColor:'green',
    //   borderRadius: 10
    // },
    footer: {
      height:45,
    //   backgroundColor:'red',
    //   padding: 1
    //   borderRadius: 10
    },
    content: {
      flex:1,
      backgroundColor:'white',
      borderRadius: 10,
      padding: 1
    },
    elem: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor:'#eee'
    },
    applyInfo: {
      backgroundColor:'white',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth:0.5,
      padding: 5
    },
    UnivLogo: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 65,
      height: 65,
      borderRadius: 10,
      backgroundColor: '#ffffff',
    },
    applySelMajor: {
      padding:8,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor:'white',
      borderRadius:5      
    },
    applySelMajorText: {
        color: '#222',
        fontWeight: 'bold'
    },
    QRPrint: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 65,
      height: 65,
      borderRadius: 10,
      backgroundColor: 'orange',
    },
    SuhumNo: {
      paddingLeft: 10,
      fontSize: 20,
      color: 'black'
    },
    ApplyTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black'
    },
    backdrop: { position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, 
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
    flexDirection: "column" 
  }

  });

export default UnivListPresenter;
