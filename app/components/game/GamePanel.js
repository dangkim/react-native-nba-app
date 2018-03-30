'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio,
  Platform
} from 'react-native'

import GameDetail from './GameDetail'
import teamMap from '../../utils/team-map'

export default class GamePanel extends Component {

  onPressRow () {
    const {navigator, game, date, actions} = this.props
    if (game.type !== 'unstart') {
      actions.toNavigation('gameDetail')
        .then(() => {
          navigator.push(Object.assign({}, {
            name: 'GameDetail',
            component: GameDetail,
            game,
            date
          }))
        })
        .catch(err => console.error(err))
    }
  }

  render () {
    const {game} = this.props

    const homeAbb = game.home.toLowerCase()
    const visitorAbb = game.visitor.toLowerCase()

    let gameProcess = ''
    let cssType = ''
    switch (game.type) {
      case 'unstart':
        gameProcess = game.date.replace(/\s*ET\s*/, '')
        cssType = 'Unstart'
        break
      case 'live':
        // gameProcess += game.process.quarter + ' '
        // gameProcess += game.process.time.replace(/\s+/, '')
        cssType = 'Live'
        break
      case 'over':
        gameProcess = 'Final'
        cssType = 'Over'
        break
      default:
        return
    }

    const homeTeamLogo = teamMap['atl'].logo
    const visitorTeamLogo = teamMap['atl'].logo

    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>
        <View style={[styles.container, {backgroundColor: teamMap['atl'].color}]} >

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={homeTeamLogo}/>
            <Text style={styles.teamCity}>{teamMap['atl'].city}</Text>
            <Text style={styles.teamName}>{game.home}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles[`process${cssType}`]]}>{gameProcess}</Text>
            {game.type !== 'unstart' &&
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{game.scoreHome}</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>{game.scoreVisiter}</Text>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={visitorTeamLogo} />
            <Text style={styles.teamCity}>{teamMap['atl'].city}</Text>
            <Text style={styles.teamName}>{game.visitor}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

GamePanel.propTypes = {
  navigator: PropTypes.object,
  game: PropTypes.object,
  date: PropTypes.array,
  actions: PropTypes.object
}

const gameFontSize = Platform.OS === 'ios' ? 31 : 25

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1.5
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2
  },
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 10,
    marginTop: 22,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 22,
    position: 'relative',
    top: 13
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoScore: {
    color: '#fff',
    fontWeight: '100',
    fontSize: gameFontSize,
    textAlign: 'center',
    width: 50
  },
  infoDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get()
  }
})
