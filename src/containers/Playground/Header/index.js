import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnimatedNumber from 'react-native-animated-number';
import {useDispatch, useSelector} from 'react-redux';
import scoreboardImg from '../../../../assets/icons/scoreboard.png';
import {MainButton} from '../../../components/MainButton';
import {StatsButton} from '../../../components/StatsButton';
const boardSize =
  Dimensions.get('window').width - (Platform.OS === 'ios' ? 50 : 30);

export const HeaderSection = () => {
  const numberWithSep = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const dispatch = useDispatch();

  const highScoreTotal = useSelector(
    state => state.scoreInfoReducer,
  ).highScoreTotal;
  const currentScore = useSelector(
    state => state.scoreInfoReducer,
  ).currentScore;
  const currentLevel = useSelector(
    state => state.scoreInfoReducer,
  ).currentLevel;
  const highLevel = useSelector(state => state.scoreInfoReducer).highLevel;
  const addedScore = useSelector(state => state.scoreInfoReducer).addedScore;

  useEffect(() => {
    if (addedScore !== 0)
      setTimeout(() => {
        dispatch({type: 'ADD_SCORE', payload: 0});
      }, 1000);
  }, [addedScore]);
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <MainButton />
        <StatsButton />
      </View>
      <View style={styles.currentScores}>
        <ImageBackground
          source={scoreboardImg}
          resizeMode="stretch"
          style={styles.imgBackground}>
          <Text style={styles.levelText}>Level : {currentLevel}</Text>
          <View style={styles.divider} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                ...styles.scoreText,
                fontSize: 12,
                marginTop: 2,
              }}>
              $
            </Text>
            <AnimatedNumber
              steps={17}
              time={10}
              value={currentScore}
              formatter={() => numberWithSep(currentScore)}
              style={styles.animatedText}
            />
          </View>
        </ImageBackground>
      </View>
      {addedScore !== 0 && (
        <Animatable.Text
          animation="fadeInUp"
          iterationCount={1}
          direction="alternate"
          easing="linear"
          duration={1000}
          style={styles.addedScore}>
          + $ {addedScore}
        </Animatable.Text>
      )}

      <View style={styles.highScores}>
        <ImageBackground
          source={scoreboardImg}
          resizeMode="stretch"
          style={styles.imgBackground}>
          <Text style={{...styles.levelText, marginBottom: 5}}>High Score</Text>
          <View style={{height: 2}} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: -5,
              paddingTop: 0,
            }}>
            <Text
              style={{
                ...styles.scoreText,
                fontSize: 12,
                marginTop: 2,
              }}>
              $
            </Text>
            <AnimatedNumber
              steps={51}
              time={50}
              value={highScoreTotal}
              formatter={() => numberWithSep(highScoreTotal)}
              style={styles.animatedText}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 50,
    width: boardSize,
    zIndex: 999,
  },
  buttons: {
    marginRight: 5,
  },
  currentScores: {
    width: '40%',
  },
  highScores: {
    flex: 1,
    marginLeft: 5,
  },
  imgBackground: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 14,
    textTransform: 'uppercase',
    lineHeight: 16,
    marginVertical: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: Platform.OS === 'android' ? 2 : 5,
    fontWeight: '700',
    color: '#ffc14c',
  },
  divider: {
    height: 2,
    width: '95%',
    backgroundColor: '#4d4d4d',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Quicksand',
  },
  addedScore: {
    position: 'absolute',
    left: 140,
    top: 35,
    fontSize: 26,
    fontWeight: '700',
    color: '#11eeff55',
    fontFamily: 'Quicksand',
    zIndex: 999,
  },
  animatedText: {
    fontSize: Platform.OS === 'ios' ? 18 : 22,
    lineHeight: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Quicksand',
    paddingTop: 0,
  },
  sep: {
    display: 'flex',
    padding: 10,
  },
});
